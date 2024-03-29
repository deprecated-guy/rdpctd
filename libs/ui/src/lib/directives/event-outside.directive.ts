import { Directive } from '@angular/core';

@Directive({
	selector: '[app-event-outside]',
	standalone: true,
	outputs: ['eventOutside'],
})
export class EventOutsideDirective {
	eventOutside = output<boolean>();
	constructor() {}
}
