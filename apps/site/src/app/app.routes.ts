import type { Route } from '@angular/router';

export const appRoutes: Route[] = [
	{
		path: '',
		loadChildren: () => import('@core/routes'),
	},
	{
		path: 'docs',
		loadChildren: () => import('@docs/app/app.routes'),
	},
];