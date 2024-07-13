import type { ElementRef } from '@angular/core';
import { ChangeDetectionStrategy, Component, HostListener, RendererFactory2, computed, inject, input, signal, viewChild } from '@angular/core';
import type { Navigation } from '@core/types';
import { TuiDropdownModule, TuiLinkModule } from '@taiga-ui/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
	selector: 'app-games-page-menu',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrl: 'games-menu.component.scss',
	templateUrl: 'games-menu.component.html',
	imports: [
		TuiLinkModule,
		RouterLink,
		RouterLinkActive,
		TuiDropdownModule,
	],
	host: {
		'[style.position]': 'position()',
		'[style.float]': 'isSticky() ? "top" : null',
		'[style.top]': 'isSticky() ? "3rem" : null',
		'[style.backdrop-filter]': '"blur(0.7rem)"',
		'[style.left]': '"0"',
	},
})
export class GamesPageMenuComponent {
	readonly menuLinks = input.required<Navigation[]>();
	private readonly menu = viewChild<ElementRef<HTMLDivElement>>('menu');
	private readonly renderer = inject(RendererFactory2).createRenderer(this.menu()?.nativeElement, null);
	readonly isSticky = signal<boolean | null>(null);
	readonly position = computed(() => this.isSticky() ? 'fixed' : 'static');

	@HostListener('document:scroll', ['$event'])
	onScroll() {
		const scrollTop = window.scrollY;
		const offsetTop = this.menu()?.nativeElement.offsetTop as number;

		if (scrollTop >= offsetTop)
			this.isSticky.set(true);
		 else this.isSticky.set(false);
	}
}