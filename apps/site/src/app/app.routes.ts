import type { Route } from '@angular/router';

export const appRoutes: Route[] = [
	{
		path: '',
		loadChildren: () => import('@core/routes'),
	},
];
