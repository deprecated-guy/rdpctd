import type { Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./pages/home/hom-page.component'),
	},
	{
		path: 'games',
		title: 'Games',
		loadComponent: () => import('./pages/games/games-page.component'),
		data: {
			breadcrumb: 'Games',
		},
	},
];
export default routes;
