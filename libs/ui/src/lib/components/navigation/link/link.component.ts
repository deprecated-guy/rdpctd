import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../icon/icon.component';

export type LinkAppearance = 'default' | 'full-width';

@Component({
	selector: 'a[appLink], button[appLink]',
	standalone: true,
	imports: [CommonModule, IconComponent],
	templateUrl: './link.component.html',
	styleUrl: './link.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[attr.data-appearance]': 'appearance()',
	},
})
export class LinkComponent {
	icon = input<string>('');
	iconRight = input('');
	appearance = input<LinkAppearance>('default');
}
