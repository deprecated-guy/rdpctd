import { Component, inject, signal, output } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { expand, map, timer } from 'rxjs';
import * as luxon from 'luxon';
import { PluralPipe } from '@ui/pipes';
import { DrawerMenuComponent, IconComponent, LinkComponent, ThemeChangerComponent } from '@ui/components';
import { RouterLink } from '@angular/router';
import { HeaderService } from './header.service';
import { HeaderItemComponent } from './item/header-item.component';
import { TuiExpand } from '@taiga-ui/core';
import { DeviceService } from '@ui/services';
import { DeviceDirective } from '@ui/directives';
import { InstallButtonComponent } from './install/install-button.component';

@Component({
	standalone: true,
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
	imports: [
		HeaderItemComponent,
		AsyncPipe,
		PluralPipe,
		IconComponent,
		TuiExpand,
		DrawerMenuComponent,
		RouterLink,
		LinkComponent,
		ThemeChangerComponent,
		DeviceDirective,
		InstallButtonComponent,
	],
	providers: [HeaderService],
})
export class HeaderComponent {
	readonly headerService = inject(HeaderService);
	readonly expanded = signal(false);
	readonly device = inject(DeviceService);

	readonly counter = toSignal(
		timer(1000).pipe(
			map(() => {
				const startDate = luxon.DateTime.fromJSDate(new Date('2024-06-25'));
				const now = luxon.DateTime.fromJSDate(new Date());

				return Math.floor(now.diff(startDate, 'days').days);
			}),
		),
		{
			initialValue: 0,
		},
	);

	openExpand(): void {
		this.expanded.update((value) => !value);
	}
}
