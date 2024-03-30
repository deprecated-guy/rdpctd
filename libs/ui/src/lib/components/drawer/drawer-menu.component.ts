import { Component, DestroyRef, inject, input } from '@angular/core';
import type { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DrawerService } from './drawer.service';

@Component({
	selector: 'app-drawer-menu',
	template: '',
	standalone: true,
	host: {
		'[style.mask]': '"url(/assets/images/svg/drawer.svg)"',
		'[style.mask-position]': '"center"',
		'[style.mask-repeat]': '"no-repeat"',
		'[style.display]': '"block"',
		'[style.cursor]': '"pointer"',
		'[style.user-select]': '"none"',
		'[style.width]': '"var(--icon-width, 1.5rem)"',
		'[style.height]': '"var(--icon-width, 1.5rem)"',
		'[style.background-color]': '"white"',
		'(click)': 'openDrawer()',
	},
})
export class DrawerMenuComponent {
	private readonly drawerService = inject(DrawerService);
	private readonly destroyRef = inject(DestroyRef);
	content = input<PolymorpheusContent>();
	menuTitle = input<string>('');

	protected openDrawer() {
		this.drawerService
			.open(this.content(), { title: this.menuTitle() })
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe();
	}
}
