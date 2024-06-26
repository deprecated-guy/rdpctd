import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { interval, map } from 'rxjs';
import { differenceInDays } from 'date-fns';
import { PluralPipe } from '@core/pipes';
import { toSignal } from '@angular/core/rxjs-interop';
import {
	DrawerMenuComponent,
	IconComponent,
	LinkComponent,
	LinkExpandableComponent,
	NumberPrecisionComponent,
	ThemeChangerComponent,
	VersionComponent,
	WithDropDownComponent,
} from '@ui/components';
import { RouterService } from '@ui/services';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [
		CommonModule,
		RouterLink,
		RouterLinkActive,
		PluralPipe,
		ThemeChangerComponent,
		DrawerMenuComponent,
		LinkExpandableComponent,
		IconComponent,
		VersionComponent,
		NumberPrecisionComponent,
		LinkComponent,
		WithDropDownComponent,
	],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.translucent]': 'translucent()',
		'[class.colored]': 'colored()',
	},
})
export class HeaderComponent implements OnInit {
	private readonly routerService = inject(RouterService);
	readonly drawerNavigation = toSignal(this.routerService.gwtLinks());

	count = interval(1000).pipe(
		map(() => {
			const startDate = new Date('2024-03-24');
			const currentDate = new Date();
			return differenceInDays(currentDate, startDate);
		}),
	);

	translucent = input(false);
	colored = input(false);

	ngOnInit() {
		this.routerService.addLink({
			title: 'home',
			routerLink: '/',
			children: [
				{
					title: 'home',
					icon: 'home',
					routerLink: '',
				},
			],
		});
	}
}
