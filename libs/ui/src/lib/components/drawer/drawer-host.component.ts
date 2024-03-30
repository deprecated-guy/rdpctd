import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import type { BehaviorSubject } from 'rxjs';
import { hostAnimation } from '../../animations';
import type { Drawer } from './tokens';
import { DRAWERS } from './tokens';

@Component({
	selector: 'app-drawer-host',
	standalone: true,
	imports: [AsyncPipe, PolymorpheusModule],
	animations: [hostAnimation],
	template: `
		@for (drawer of (drawers | async) ?? []; track $index) {
		<section class="drawers" role="dialog" @hostAnimation>
			<ng-container *polymorpheusOutlet="drawer.component; context: drawer"></ng-container>
		</section>
		}
	`,
	styles: `
    .drawers  {
      background: rgba(0 0 0 / 50%);
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 100;
      position: fixed;
      height: 100%;
      width: 100%;
    }
  `,
})
export class DrawerHostComponent {
	readonly drawers: BehaviorSubject<ReadonlyArray<Drawer<unknown>>> = inject(DRAWERS);
}
