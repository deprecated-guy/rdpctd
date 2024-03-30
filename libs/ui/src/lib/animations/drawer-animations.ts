import { animate, style, transition, trigger } from '@angular/animations';

export const drawerAnimations = trigger('drawerAnimation', [
	transition(':enter', [
		animate(0, style({ left: '-100%' })),
		animate(200, style({ left: '0', background: '#f9f9fa' })),
	]),
	transition(':leave', [
		animate(0, style({ left: '0', background: '#f9f9fa' })),
		animate(200, style({ left: '-100%', background: '#f9f9fa' })),
	]),
]);
