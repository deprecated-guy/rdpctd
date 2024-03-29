import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { interval, map } from 'rxjs';
import { differenceInDays } from 'date-fns';
import { PluralPipe } from '@core/pipes';
import { ThemeChangerComponent } from '../../../../../../libs/ui/src/lib/components';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [CommonModule, RouterLink, RouterLinkActive, PluralPipe, ThemeChangerComponent],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.translucent]': 'translucent()',
		'[class.colored]': 'colored()',
	},
})
export class HeaderComponent {
	count = interval(1000).pipe(
		map(() => {
			const startDate = new Date('2024-03-24');
			const currentDate = new Date();
			return differenceInDays(currentDate, startDate);
		}),
	);

	translucent = input(false);
	colored = input(false);
}
