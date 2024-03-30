import { animate, style, transition, trigger } from '@angular/animations';

export const hostAnimation = trigger('hostAnimation', [
	transition(':enter', [animate(0, style({ opacity: 0 })), animate('200ms', style({ opacity: 1 }))]),
	transition(':leave', [animate(0, style({ opacity: 1 })), animate(200, style({ opacity: 0 }))]),
]);
