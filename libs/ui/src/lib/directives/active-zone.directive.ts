import { Directive, ElementRef, HostListener, inject, output } from '@angular/core';
import { RouterLinkActive } from '@angular/router';

@Directive({
	selector: '[pointerOut],[clickOutside]',
	standalone: true,
})
export class ActiveZoneDirective {
	private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
	private readonly routerLinkActive = inject(RouterLinkActive);

	readonly clickOutside = output<boolean>();
	readonly pointerOut = output<boolean>();

	@HostListener('mouseenter', ['$event'])
	@HostListener('mouseleave', ['$event'])
	onMouseEnter(event: MouseEvent) {
		if (event.type === 'mouseleave'
			&& this.element.contains(event.target as Node)
			&& this.routerLinkActive.isActive
		) this.pointerOut.emit(true);
		else this.pointerOut.emit(false);
	}

	@HostListener('mousedown', ['$event'])
	@HostListener('pointerdown', ['$event'])
	onMouseDown(event: MouseEvent) {
		if (!this.element.contains(event.target as Node) && !this.routerLinkActive.isActive)
			this.clickOutside.emit(true);
		else this.clickOutside.emit(false);
	}
}
