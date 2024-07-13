import { Component, inject } from '@angular/core';
import { BreadcrumbsComponent } from '@ui/components';
import { GamesPageMenuComponent } from '@core/pages/games/components/menu/games-menu.component';
import { GamesBannerComponent } from './components/banner.component';
import { GamesPageMenuService } from './games-page-menu.service';

@Component({
	selector: 'app-games-page',
	standalone: true,
	templateUrl: './games-page.component.html',
	imports: [BreadcrumbsComponent, GamesBannerComponent, GamesPageMenuComponent],
	providers: [GamesPageMenuService],
})
export default class GamesPageComponent {
	readonly navigationService = inject(GamesPageMenuService);
}