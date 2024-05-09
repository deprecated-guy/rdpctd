import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { IconComponent } from '@ui/components';
import { themeChangerAnimation } from '@ui/animations';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActiveZoneDirective } from '@ui/directives';

type Theme = 'light' | 'dark' | 'system';

@Component({
	selector: 'app-theme-changer',
	standalone: true,
	imports: [CommonModule, IconComponent, ActiveZoneDirective],
	templateUrl: './theme-changer.component.html',
	styleUrl: './theme-changer.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [themeChangerAnimation],
	host: {
		'[style.cursor]': '"pointer"',
		'[style.user-select]': '"none"',
	},
})
export class ThemeChangerComponent {
	private readonly theme$ = new BehaviorSubject<Theme>((localStorage.getItem('theme') as Theme) ?? 'system');
	isOpened = false;
	theme = toSignal(this.theme$);

	constructor() {
		const media = window.matchMedia('(prefers-color-scheme: dark)');
		if (this.theme() === 'system') document.body.setAttribute('data-theme', media.matches ? 'dark' : 'light');
		else document.body.setAttribute('data-theme', 'dark');
	}

	changeTheme = (theme: Theme): void => {
		localStorage.setItem('theme', theme as string);
		this.isOpened = false;
		this.theme$.next(theme);
		if (theme === 'system') {
			const media = window.matchMedia('(prefers-color-scheme: dark)');
			document.body.setAttribute('data-theme', media.matches ? 'dark' : 'light');
		} else {
			document.body.setAttribute('data-theme', theme as string);
		}
	};
}
