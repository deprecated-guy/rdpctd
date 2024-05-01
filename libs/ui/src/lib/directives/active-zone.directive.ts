import { Directive, ElementRef, HostListener, inject, output } from '@angular/core';

@Directive({
	selector: '[activeZone][activeZoneChange]',
	standalone: true,
})
export class ActiveZoneDirective {
	private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
	activeZoneChange = output<boolean>();

	@HostListener('document:pointerdown', ['$event'])
	@HostListener('pointerenter', ['$event'])
	@HostListener('pointerleave', ['$event'])
	onPointerEvent(event: PointerEvent) {
		if (event.type === 'pointerleave') {
			this.activeZoneChange.emit(false);
		} else if (event.type === 'pointerenter' || event.type === 'pointerdown') {
			if (this.element.contains(event.target as Node)) this.activeZoneChange.emit(true);
			else this.activeZoneChange.emit(false);
		}
	}
}
