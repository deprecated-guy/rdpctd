import type { ElementRef } from '@angular/core';
// eslint-disable-next-line max-len
import { ChangeDetectionStrategy, Component, HostListener, RendererFactory2, computed, inject, input, signal, viewChild } from '@angular/core';
import { TuiDropdown, TuiLink } from '@taiga-ui/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import type { Navigation } from '@core/types';
 
@Component({
	selector: 'app-page-menu',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrl: 'menu.component.scss',
	templateUrl: 'menu.component.html',
	imports: [
		TuiLink,
		RouterLink,
		RouterLinkActive,
		TuiDropdown,
	],
	host: {
		'[style.position]': 'position()',
		'[style.float]': 'isSticky() ? "top" : null',
		'[style.top]': 'isSticky() ? "3rem" : null',
		'[style.backdrop-filter]': '"blur(0.7rem)"',
		'[style.left]': '"0"',
	},
})
export class PageMenuComponent {
	readonly menuLinks = input.required<Navigation[]>();
	private readonly menu = viewChild<ElementRef<HTMLDivElement>>('menu');
	private readonly renderer = inject(RendererFactory2).createRenderer(this.menu()?.nativeElement, null);
	readonly isSticky = signal<boolean | null>(null);
	readonly position = computed(() => this.isSticky() ? 'fixed' : 'static');

	@HostListener('window:scroll', ['$event'])
	onScroll() {
		const scrollTop = window.scrollY;
		const menuElement = this.menu()?.nativeElement;
		const offsetTop = menuElement?.offsetTop ?? 0;
		const menuHeight = menuElement?.offsetHeight ?? 0;

		if (scrollTop > offsetTop + menuHeight) {
			this.isSticky.set(true);
		} else if (scrollTop <= offsetTop) {
			this.isSticky.set(false);
		}
	}
}
