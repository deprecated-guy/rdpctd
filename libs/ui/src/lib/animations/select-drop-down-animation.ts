import { animate, state, style, transition, trigger } from '@angular/animations';

export const themeChangerAnimation = trigger('themeChangerAnimation', [
	state('opened', style({ transform: 'translateY(0)', opacity: 1 })),
	state('closed', style({ transform: 'translateY(-20px)', opacity: 0 })),
	transition('opened<=>closed', animate(200)),
]);
