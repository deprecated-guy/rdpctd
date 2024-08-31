import { Component, inject } from '@angular/core';
import { BreadcrumbsComponent } from '@ui/components';
import { GamesPageMenuService } from './games-page-menu.service';
import { PageMenuComponent } from '@shared/components/menu';
import { PageBannerComponent } from '@shared/components/banner.component';

@Component({
	selector: 'app-games-page',
	standalone: true,
	templateUrl: './games-page.component.html',
	imports: [BreadcrumbsComponent, PageBannerComponent, PageMenuComponent],
	providers: [GamesPageMenuService],
})
export default class GamesPageComponent {
	readonly navigationService = inject(GamesPageMenuService);
}
