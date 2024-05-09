import { animate, style, transition, trigger } from '@angular/animations';

export const themeChangerAnimation = trigger('themeChangerAnimation', [
	transition(':enter', [
		style({ transform: 'translateY(-20px)', opacity: 0 }),
		animate('200ms', style({ transform: 'translateY(0)', opacity: 1 })),
	]),
	transition(':leave', [animate('200ms', style({ transform: 'translateY(-20px)', opacity: 0 }))]),
]);
