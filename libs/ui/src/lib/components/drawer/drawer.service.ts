import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IdService } from '../../services';
import type { DrawerOptions } from './tokens';
import { DRAWERS } from './tokens';
import { DrawerComponent } from './drawer.component';
import { PolymorpheusComponent, PolymorpheusContent } from '@taiga-ui/polymorpheus';

@Injectable({
	providedIn: 'root',
})
export class DrawerService {
	private readonly drawers = inject(DRAWERS);
	private readonly component = new PolymorpheusComponent(DrawerComponent);
	private readonly id = inject(IdService);

	open(content: PolymorpheusContent, options?: DrawerOptions) {
		return new Observable((observer) => {
			const drawer = {
				id: this.id.generate(),
				$implicit: observer,
				component: this.component,
				content,
				...options,
			};

			this.drawers.next([...this.drawers.getValue(), drawer as any]);

			observer.next({
				...drawer,
			});

			return () => this.drawers.value.filter((d) => d !== (drawer as any));
		});
	}
}
