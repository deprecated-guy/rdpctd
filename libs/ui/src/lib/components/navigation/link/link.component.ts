import { ChangeDetectionStrategy, Component, RendererFactory2, inject, input, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolymorpheusOutlet, type PolymorpheusContent } from '@taiga-ui/polymorpheus';
import { ActiveZoneDirective } from '@ui/directives';
import { DropDownService } from '@ui/components/drop-down/drop-down.service';

import type { Icon } from '@ui/components/icon';
import { IconComponent } from '../../icon';

export type LinkAppearance = 'default' | 'full-width';

@Component({
	selector: 'a[appLink], button[appLink]',
	standalone: true,
	imports: [CommonModule, IconComponent, ActiveZoneDirective, PolymorpheusOutlet],
	templateUrl: './link.component.html',
	styleUrl: './link.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[attr.data-appearance]': 'appearance()',
	},
})
export class LinkComponent {
	private readonly renderer = inject(RendererFactory2).createRenderer(null, null);
	private readonly dropdownService = inject(DropDownService);
	private readonly host = viewChild.required<HTMLDivElement>('link');
	icon = input<Icon>();
	iconRight = input<Icon>();
	appearance = input<LinkAppearance | string>('default');
	dropdown = input<PolymorpheusContent>(null);
}
