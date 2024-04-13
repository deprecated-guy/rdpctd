import type { Route } from '@angular/router';

const docsRoutes: Route[] = [
	{
		path: '',
		loadComponent: () => import('./docs-home/docs-home.component'),
		data: {
			package: 'Home',
			component: 'Docs',
			experimental: true,
		},
	},
	{
		path: 'precision',
		loadComponent: () => import('./precision/precision.component'),
		data: {
			component: 'Docs',
			package: 'precision',
		},
	},
];
export default docsRoutes;
