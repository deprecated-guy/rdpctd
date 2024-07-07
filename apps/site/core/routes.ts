import type { Routes } from '@angular/router';

const routes: Routes = [
	{
		title: 'Home',
		path: '',
		loadComponent: () => import('./pages/home/home-page.component'),
	},
];

export default routes;