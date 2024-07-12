import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
	TuiButtonModule,
	TuiExpandModule,
	TuiLinkModule,
	TuiModeModule,
	TuiSvgModule,
	TuiThemeNightModule,
} from '@taiga-ui/core';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { expand, map, timer } from 'rxjs';
import * as luxon from 'luxon';
import { PluralPipe } from '@ui/pipes';
import { DrawerMenuComponent, IconComponent, LinkComponent } from '@ui/components';
import { DrawerService } from '@ui/components/drawer/drawer.service';
import { RouterLink } from '@angular/router';
import { HeaderService } from './header.service';
import { HeaderItemComponent } from './item/header-item.component';

@Component({
	standalone: true,
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
	imports: [
		HeaderItemComponent,
		TuiThemeNightModule,
		TuiModeModule,
		AsyncPipe,
		TuiButtonModule,
		TuiLinkModule,
		TuiSvgModule,
		PluralPipe,
		IconComponent,
		DrawerMenuComponent,
		RouterLink,
		TuiExpandModule,
		LinkComponent,
	],
	providers: [HeaderService],
})
export class HeaderComponent {
	readonly headerService = inject(HeaderService);
	private readonly destroyRef = inject(DestroyRef);
	private readonly drawerService = inject(DrawerService);
	readonly expanded = signal(false);

	readonly counter = toSignal(timer(1000).pipe(
		map(() => {
			const startDate = luxon.DateTime.fromJSDate(new Date('2024-06-25'));
			const now = luxon.DateTime.fromJSDate(new Date());

			return Math.floor(now.diff(startDate, 'days').days);
		}),
	), {
		initialValue: 0,
	});

	protected readonly expand = expand;

	openExpand() {
		this.expanded.update(value => !value);
		console.log(this.expanded());
	}
}