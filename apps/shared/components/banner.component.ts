import { Component, computed, input } from '@angular/core';

@Component({
	selector: 'app-page-banner',
	templateUrl: './banner.component.html',
	styleUrl: './banner.component.scss',
	standalone: true,
	host: {
		'[style.display]': '"block"',
		'[style.background]': 'bg()',
		'[style.z-index]': '1',
		'[style.height]': '"10rem"',
	},
})
export class PageBannerComponent {
	readonly title = input.required<string>();
	readonly backGroundImage = input.required<string>();
	readonly bg = computed(() => `url(${this.backGroundImage()})`);
}
