import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import type { Icon } from '@ui/components';

export interface ApplicationRouterLink {
	icon?: Icon;
	routerLink: string;
	title: string;
	children?: ApplicationRouterLink[];
}

@Injectable({
	providedIn: 'root',
})
export class RouterService {
	private readonly routes = new BehaviorSubject<ReadonlyArray<ApplicationRouterLink>>([]);

	addLink(link: ApplicationRouterLink | ApplicationRouterLink[]) {
		if (Array.isArray(link)) this.routes.next([...this.routes.value, ...link]);
		else this.routes.next([...this.routes.value, link]);
	}

	gwtLinks() {
		return this.routes.asObservable();
	}
}
