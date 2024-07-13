import type { Routes } from '@angular/router';

const routes: Routes = [
	{
		title: 'Home',
		path: '',
		loadComponent: () => import('./pages/home/home-page.component'),
		data: {
			breadcrumb: 'Home',
		},
	},
	{
		title: 'Changelog',
		path: 'changelog',
		loadComponent: () => import('./pages/changelog/changelog-page.component'),
	},
	{
		title: 'Games',
		path: 'games',
		loadComponent: () => import('./pages/games/games-page.component'),
		data: {
			breadcrumb: 'Games',
		},
		children: [
			{
				path: 'racing',
				title: 'Games - Racing',
				loadComponent: () => import('./pages/games/games-page.component'),
				data: {
					breadcrumb: 'Racing',
				},
			},
		],
	},
];

export default routes;