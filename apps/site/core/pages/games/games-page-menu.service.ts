import { Injectable, signal } from '@angular/core';
import type { Navigation } from '../../types';

@Injectable()
export class GamesPageMenuService {
	readonly pageNavigation = signal<Navigation[]>([
		{
			title: 'Games',
			routerLink: '.',
		},
		{
			title: 'Racing',
			routerLink: 'racing',
		},
		{
			title: 'Indie/Sandbox',
			routerLink: 'games',
		},
		{
			title: 'Fighting',
			routerLink: 'games',
		},
		{
			title: 'Simulators',
			routerLink: 'games',
		},
		{
			title: 'Roguelike',
			routerLink: 'games',
		},
		{
			title: 'War games',
			routerLink: 'games',
		},
		{
			title: 'Online games',
			routerLink: 'games',
		},
	]);
}