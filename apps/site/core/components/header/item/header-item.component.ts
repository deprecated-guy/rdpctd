import { Component, input } from '@angular/core';
import { TuiDropdownDirective, TuiDropdownHover, TuiDropdownManual, TuiLink } from '@taiga-ui/core';
import { RouterLink } from '@angular/router';
import type { Navigation } from '@core/types';
import { IconComponent, LinkComponent } from '@ui/components';

@Component({
	selector: 'app-header-item',
	templateUrl: './header-item.component.html',
	styleUrl: './header-item.component.scss',
	standalone: true,
	imports: [
		RouterLink,
		LinkComponent,
		TuiDropdownManual,
		IconComponent,
		TuiLink,
		TuiDropdownHover,
		TuiDropdownDirective,
	],
})
export class HeaderItemComponent {
	readonly dropdownItem = input<Navigation | null>(null);
}
