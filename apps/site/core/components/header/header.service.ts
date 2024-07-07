import { Injectable, signal } from '@angular/core';
import type { Navigation } from '@core/types';

@Injectable({ providedIn: null })
export class HeaderService {
	readonly navigation = signal<ReadonlyArray<Navigation>>([
		{
			title: 'Home',
			routerLink: '',
		},
		{
			title: 'Games',
			routerLink: '/games',
		},
	]);
}