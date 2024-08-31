import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export const icons = {
	nothing: '',
	chevronRight: '/assets/images/svg/chevron-right.svg',
	drawer: '/assets/images/svg/drawer.svg',
	home: '/assets/images/svg/home.svg',
	palette: '/assets/images/svg/palette.svg',
	logo: '/assets/logo.svg',
	'go-back': '/assets/images/svg/go-back.svg',
	dark: '/assets/images/svg/dark-mode.svg',
	light: '/assets/images/svg/light-mode.svg',
	game: '/assets/images/svg/game.svg',
	system: '/assets/images/svg/system.svg',
	download: '/assets/images/svg/install-desktop-rounded.svg',
};

export type Icon = keyof typeof icons;

@Component({
	selector: 'app-icon',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './icon.component.html',
	styleUrl: './icon.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[style.display]': '"block"',
		'[style.mask-image]': 'path()',
		'[style.background-color]': '"currentColor"',
		'[style.mask-position]': '"center"',
		'[style.width.rem]': '1.5',
		'[style.mask-repeat]': '"no-repeat"',
		'[style.z-index]': '1',
		'[style.height.rem]': '1.5',
	},
})
export class IconComponent {
	iconName = input<Icon>();
	onlineIcon = input<string>();
	path = computed(() => {
		return this.onlineIcon() ? `url(${this.onlineIcon()})` : `url(${icons[this.iconName()!]})`;
	});
}
