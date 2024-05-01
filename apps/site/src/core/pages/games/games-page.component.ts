import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreadcrumbsComponent } from '@ui/components';

@Component({
	selector: 'app-games-page',
	standalone: true,
	templateUrl: './games-page.component.html',
	styleUrl: './games-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [BreadcrumbsComponent],
})
export default class GamesPageComponent {}
