import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { interval, map } from 'rxjs';
import { differenceInDays } from 'date-fns';
import { PluralPipe } from '@core/pipes';

@Component({
	selector: 'app-header',
	standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, PluralPipe],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  count = interval(1000).pipe(
    map(() => {
      const startDate = new Date('2024-03-24');
      const currentDate = new Date();
      return differenceInDays(currentDate, startDate);
    }),
  );
}
