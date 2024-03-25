import type { Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./pages/home/hom-page.component'),
	},
];
export default routes;
