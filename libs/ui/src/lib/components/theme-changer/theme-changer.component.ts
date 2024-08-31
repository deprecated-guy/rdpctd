import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { IconComponent } from '@ui/components';
import { themeChangerAnimation } from '@ui/animations';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActiveZoneDirective } from '@ui/directives';

type Theme = 'light' | 'dark';

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
	private readonly theme$ = new BehaviorSubject<Theme>((localStorage.getItem('theme') as Theme) ?? 'light');
	isOpened = false;
	readonly theme = toSignal(this.theme$);

	constructor() {
		document.body.setAttribute('tuiTheme', this.theme() as string);
	}

	changeTheme = (theme: Theme): void => {
		localStorage.setItem('theme', theme);
		this.isOpened = false;
		this.theme$.next(theme);
		document.body.setAttribute('tuiTheme', theme);
	};
}
