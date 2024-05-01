import { ChangeDetectionStrategy, Component, RendererFactory2, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, map } from 'rxjs';
import type { Icon } from '@ui/components';
import { IconComponent, LinkComponent } from '@ui/components';

interface RouteData {
	package: string;
	component: string;
	experimental: boolean;
	deprecated: boolean;
}

@Component({
	selector: 'app-docs-layout',
	standalone: true,
	imports: [CommonModule, LinkComponent, RouterLink, IconComponent, RouterLinkActive],
	templateUrl: './docs-layout.component.html',
	styleUrl: './docs-layout.component.scss',
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsLayoutComponent {
	theme = localStorage.getItem('theme');
	private readonly route = inject(ActivatedRoute);
	private readonly renderer = inject(RendererFactory2).createRenderer(this, null);
	themeSubj = new BehaviorSubject<Icon>(this.theme !== null ? (this.theme as Icon) : 'dark');

	changeTheme() {
		this.themeSubj.next(this.themeSubj.value === 'dark' ? 'light' : 'dark');
		this.renderer.setAttribute(document.body, 'data-theme', this.themeSubj.getValue());
		localStorage.setItem('theme', this.themeSubj.value);
	}

	routeData = toSignal<RouteData | null>(
		this.route.data.pipe(
			map((data) => ({
				package: data['package'],
				component: data['component'],
				deprecated: data['deprecated'],
				experimental: data['experimental'],
			})),
		),
		{ initialValue: null },
	);
}
