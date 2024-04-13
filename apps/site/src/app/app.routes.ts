import type { Route } from '@angular/router';

export const appRoutes: Route[] = [
	{
		path: '',
		pathMatch: 'full',
		loadChildren: () => import('@core/routes'),
	},
	{
		path: 'docs',
		loadChildren: () => import('@core/pages/docs/docs.routes'),
		outlet: 'docs',
	},
];
