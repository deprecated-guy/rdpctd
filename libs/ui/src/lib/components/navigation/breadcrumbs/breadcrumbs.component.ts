import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	ViewEncapsulation,
	inject,
	input,
	signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { LinkComponent } from '@ui/components';
import { distinctUntilChanged, filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface Breadcrumb {
	label: string;
	url: string;
}

@Component({
	selector: 'app-breadcrumbs',
	standalone: true,
	imports: [CommonModule, LinkComponent, RouterLink],
	templateUrl: './breadcrumbs.component.html',
	styleUrls: ['./breadcrumbs.component.scss'],
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {
	private readonly activatedRoute = inject(ActivatedRoute);
	private readonly router = inject(Router);
	private readonly destroyRef = inject(DestroyRef);
	readonly breadcrumbs = signal<ReadonlyArray<Breadcrumb>>([]);

	 readonly separator = input('/');

	 constructor(

	 ) {
	 	this.breadcrumbs.set(this.buildBreadCrumb(this.activatedRoute));
	 }

	 ngOnInit() {
	 	this.router.events.pipe(
	 		filter((event) => event instanceof NavigationEnd),
	 		distinctUntilChanged(),
	 		takeUntilDestroyed(this.destroyRef),
	 	).subscribe(() => {
	 		this.breadcrumbs.set(this.buildBreadCrumb(this.activatedRoute));
	 	});
	 }

	 /**
		 * Recursively build breadcrumb according to activated route.
		 * @param route
		 * @param url
		 * @param breadcrumbs
		 */
	 buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
	 	// If no routeConfig is avalailable we are on the root path
	 	let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data['breadcrumb'] : '';
	 	const isClickable = route.routeConfig && route.routeConfig.data && route.routeConfig.data['isClickable'];
	 	let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

	 	// If the route is dynamic route such as ':id', remove it
	 	const lastRoutePart = path?.split('/').pop();
	 	const isDynamicRoute = lastRoutePart?.startsWith(':');
	 	if (isDynamicRoute && !!route.snapshot) {
	 		const paramName = lastRoutePart?.split(':')[1];
	 		path = path?.replace(lastRoutePart!, route.snapshot.params[paramName!]);
	 		label = route.snapshot.params[paramName!];
	 	}

	 	// In the routeConfig the complete path is not available,
	 	// so we rebuild it each time
	 	const nextUrl = path ? `${url}/${path}` : url;

	 	const breadcrumb: Breadcrumb = {
	 		label,
	 		url: nextUrl,
	 	};
	 	// Only adding route with non-empty label
	 	const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
	 	if (route.firstChild) {
	 		// If we are not on our current path yet,
	 		// there will be more children to look after, to build our breadcumb
	 		return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
	 	}
	 	return newBreadcrumbs;
	 }
}
