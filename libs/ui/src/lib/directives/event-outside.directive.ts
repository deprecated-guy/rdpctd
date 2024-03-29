import { Directive, ElementRef, HostListener, inject, output } from '@angular/core';

@Directive({
	selector: '[appEventOutside]',
	standalone: true,
})
export class EventOutsideDirective {
	private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
	eventOutside = output<boolean>();

	@HostListener('mousedown', ['$event', '$event.target'])
	onMouseDown(event: PointerEvent) {
		if (this.element.nativeElement.contains(event.target as Node)) this.eventOutside.emit(true);
		this.eventOutside.emit(false);
	}
}
