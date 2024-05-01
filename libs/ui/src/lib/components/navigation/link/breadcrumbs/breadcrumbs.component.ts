import { ChangeDetectionStrategy, Component, DestroyRef, ViewEncapsulation, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { BehaviorSubject, distinctUntilChanged, filter, tap } from 'rxjs';
import { LinkComponent } from '@ui/components';
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
	styleUrl: './breadcrumbs.component.scss',
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {
	private readonly activatedRoute = inject(ActivatedRoute);
	private readonly router = inject(Router);
	private readonly destroyRef = inject(DestroyRef);

	readonly separator = input('/');

	breadcrumbs = new BehaviorSubject<ReadonlyArray<Breadcrumb>>([]);

	constructor() {
		this.router.events
			.pipe(
				filter((event) => event instanceof NavigationEnd),
				tap((event) => {
					if (event instanceof NavigationEnd) {
						this.breadcrumbs.next([...this.breadcrumbs.value, ...this.generateBreadCrumb(this.activatedRoute)]);
					}
				}),
				distinctUntilChanged(),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe();
	}

	private generateBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
		let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data['breadcrumb'] : '';
		let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

		const lastRoutePart = path?.split('/').pop();
		const isDynamicRoute = lastRoutePart?.startsWith(':');
		if (isDynamicRoute && !!route.snapshot) {
			const paramName = lastRoutePart!.split(':')[1]!;
			path = path?.replace(lastRoutePart!, route.snapshot.params[paramName]);
			label = route.snapshot.params[paramName];
		}

		const nextUrl = path ? `${url}/${path}` : url;

		const breadcrumb: Breadcrumb = {
			label,
			url: nextUrl,
		};

		const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
		if (route.firstChild) return this.generateBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);

		return newBreadcrumbs;
	}
}
