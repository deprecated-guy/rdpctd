import type { ElementRef } from '@angular/core';
import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { POLYMORPHEUS_CONTEXT, PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import { ThemeChangerComponent } from '@ui/components';
import { RouterLinkActive } from '@angular/router';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import type { BehaviorSubject } from 'rxjs';
import type { Drawer } from './tokens';
import { DRAWERS } from './tokens';

@Component({
	selector: 'app-drawer',
	standalone: true,
	imports: [
		CommonModule,
		PolymorpheusModule,
		ThemeChangerComponent,
		TuiActiveZoneModule,
	],
	templateUrl: './drawer.component.html',
	styleUrl: './drawer.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [],
	providers: [RouterLinkActive],
})
export class DrawerComponent {
	private readonly drawer = viewChild<ElementRef<HTMLElement>>('drawer');

	ngOnInit() {
		this.drawer()?.nativeElement.classList.add('opened');
	}

	constructor(
		@Inject(POLYMORPHEUS_CONTEXT) readonly context: Drawer<any>,
		@Inject(DRAWERS) readonly drawers: BehaviorSubject<Drawer<any>[]>,
	) {}

	catchEvent(event: boolean) {
		if (!event) {
			this.drawer()!.nativeElement.classList.remove('open');
			this.drawer()!.nativeElement.classList.add('closed');

			this.drawers.next([]);
		}
	}
}
