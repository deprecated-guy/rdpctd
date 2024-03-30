import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-icon',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './icon.component.html',
	styleUrl: './icon.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[style.display]': '"block"',
		'[style.mask-image]': 'concatPath()',
		'[style.mask-position]': '"center"',
		'[style.width]': '"var(--icon-width, 1.135rem)"',
		'[style.z-index]': '1',
		'[style.height]': '"var(--icon-width, 1.135rem)"',
	},
})
export class IconComponent {
	iconName = input('');
	concatPath = computed(() => {
		const directory: Record<string, string> = {
			svg: 'svg/',
			png: 'svg/',
			jpg: 'svg/jpeg',
			gif: 'any/',
		};

		return `url(/assets/images/${directory[this.iconName().split('.')[1]]}${this.iconName()})`;
	});
}
