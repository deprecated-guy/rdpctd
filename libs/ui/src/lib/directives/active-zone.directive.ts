import { Directive, ElementRef, HostListener, inject, output } from '@angular/core';

@Directive({
	selector: '[activeZone]',
	standalone: true,
})
export class ActiveZoneDirective {
	private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
	activeZoneChangePointerDown = output<boolean>();
	activeZoneChangePointerEnter = output<boolean>();

	@HostListener('document:pointerdown', ['$event'])
	onPointerEvent(event: PointerEvent) {
		if (this.element.contains(event.target as Node)) this.activeZoneChangePointerDown.emit(true);
		else this.activeZoneChangePointerDown.emit(false);
	}

	@HostListener('pointerenter', ['$event'])
	@HostListener('pointerleave', ['$event'])
	onPointerEnter(event: PointerEvent) {
		if (this.element.contains(event.target as Node)) this.activeZoneChangePointerEnter.emit(true);
		else this.activeZoneChangePointerEnter.emit(false);
	}
}
