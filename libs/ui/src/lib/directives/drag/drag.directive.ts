import {
	Directive,
	ElementRef,
	HostListener,
	TemplateRef,
	ViewContainerRef,
	computed,
	contentChildren,
	inject,
	output,
	signal,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
	selector: '[drag]',
	standalone: true,
	host: {
		'[class.dragging]': 'drag',
		'[style.user-select]': '"none"',
	},
})
export class DragDirective {
	position = signal({ x: 0, y: 0 });
	dragStart = output<PointerEvent>();
	dragMove = output<PointerEvent>();
	dragRelease = output<PointerEvent>();
	readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
	protected drag = false;

	@HostListener('pointerdown', ['$event'])
	onPointerDown(event: PointerEvent) {
		this.drag = true;
		this.dragStart.emit(event);
	}

	@HostListener('document:pointermove', ['$event'])
	omPointerMove(event: PointerEvent) {
		if (!this.drag) return;
		this.dragMove.emit(event);
	}

	@HostListener('document:pointerup', ['$event'])
	onPointerUp(event: PointerEvent) {
		this.drag = false;
		this.dragRelease.emit(event);
	}
}

@Directive({
	selector: '[drag]',
	standalone: true,
	host: {
		'[style.transform]': 'sanitizedValue()',
	},
})
export class DragMoveDirective extends DragDirective {
	private readonly sanitizer = inject(DomSanitizer);
	private startPosition = signal({
		x: 0,
		y: 0,
	});

	sanitizedValue = computed(() =>
		this.sanitizer.bypassSecurityTrustStyle(`
		  translate(${this.position().x / 16}rem, ${this.position().y / 16}rem)
		`),
	);

	@HostListener('dragStart', ['$event'])
	onDragStart(event: PointerEvent) {
		this.startPosition.set({ x: event.clientX - this.position().x, y: event.clientY - this.position().y });
	}

	@HostListener('dragMove', ['$event'])
	onDragMove(event: PointerEvent) {
		this.position.set({
			x: event.clientX - this.startPosition().x,
			y: event.clientY - this.startPosition().y,
		});
	}

	@HostListener('dragRelease', ['$event'])
	onDragRelease() {
		this.drag = false;
	}
}

@Directive({
	selector: '[listDraggable]',
	standalone: true,
})
export class ListDraggableDirective {
	private readonly draggables = contentChildren(DragMoveDirective);
	private readonly nativeElement = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
	private boundaries = signal({
		minX: 0,
		minY: 0,
		maxY: 0,
		maxX: 0,
	});

	ngAfterContentInit() {
		this.draggables().forEach((draggable) => draggable.dragStart.subscribe(() => this.measure(draggable)));
		// eslint-disable-next-line max-len
		this.draggables().forEach((draggable) => draggable.dragMove.subscribe(() => this.maintainBoundaries(draggable)));
	}

	measure(draggable: DragMoveDirective) {
		const dragRect = draggable.elementRef.nativeElement.getBoundingClientRect();
		const areaDomRect = this.nativeElement.getBoundingClientRect();

		this.boundaries.set({
			minX: areaDomRect.left - dragRect.left + draggable.position().x,
			maxX: areaDomRect.right - dragRect.right + draggable.position().x,
			minY: areaDomRect.top - dragRect.top + draggable.position().y,
			maxY: areaDomRect.bottom - dragRect.bottom + draggable.position().y,
		});
	}

	maintainBoundaries(draggable: DragMoveDirective) {
		const position = { ...draggable.position() };
		position.x = Math.max(this.boundaries().minX, position.x);
		position.x = Math.min(this.boundaries().maxX, position.x);
		position.y = Math.max(this.boundaries().minY, position.y);
		position.y = Math.min(this.boundaries().maxY, position.y);
		draggable.position.set({ ...position });
	}
}

@Directive({
	selector: '[dragPlaceholder]',
	standalone: true,
})
export class DragPlaceholder {
	private readonly template = inject(TemplateRef);
	private readonly viewContainerRef = inject(ViewContainerRef);
	private readonly draggable = inject(DragDirective);
	private startPOs = signal({ x: 0, y: 0 });

	ngOnInit() {
		this.draggable.dragStart.subscribe((event) => this.onDrag(event));
		this.draggable.dragMove.subscribe((event) => this.dragMove(event));
		this.draggable.dragRelease.subscribe(() => this.dragRelease());
	}

	private onDrag(event: PointerEvent) {
		const rect = this.draggable.elementRef.nativeElement.getBoundingClientRect();

		this.startPOs.set({
			x: event.clientX - rect.left,
			y: event.clientY - rect.top,
		});
	}

	private dragMove(event: PointerEvent) {
		const position = {
			x: event.clientX - this.startPOs().x,
			y: event.clientY - this.startPOs().y,
		};
		if (this.viewContainerRef.length > 0) return;

		this.viewContainerRef.createEmbeddedView(this.template, {
			$implicit: position,
		});
	}

	private dragRelease() {
		this.viewContainerRef.clear();
	}
}