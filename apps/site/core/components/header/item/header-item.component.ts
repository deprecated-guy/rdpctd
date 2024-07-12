import { Component, input } from '@angular/core';
import { TuiDropdownModule, TuiHostedDropdownModule, TuiLinkModule } from '@taiga-ui/core';
import { RouterLink } from '@angular/router';
import type { Navigation } from '@core/types';
import { IconComponent, LinkComponent } from '@ui/components';

@Component({
	selector: 'app-header-item',
	templateUrl: './header-item.component.html',
	styleUrls: ['./header-item.component.scss'],
	standalone: true,
	imports: [
		TuiLinkModule,
		TuiDropdownModule,
		RouterLink,
		LinkComponent,
		TuiHostedDropdownModule,
		IconComponent,
	],
})
export class HeaderItemComponent {
	readonly dropdownItem = input<Navigation | null>(null);
}