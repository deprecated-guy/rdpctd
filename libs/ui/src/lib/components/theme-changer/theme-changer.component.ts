import { ChangeDetectionStrategy, Component, ViewEncapsulation, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { IconComponent } from '@ui/components';
import { themeChangerAnimation } from '@ui/animations';
import { EventOutsideDirective } from '@ui/directives';

@Component({
	selector: 'app-theme-changer',
	standalone: true,
	imports: [CommonModule, IconComponent, EventOutsideDirective],
	templateUrl: './theme-changer.component.html',
	styleUrl: './theme-changer.component.scss',
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [themeChangerAnimation],
	host: {
		'[style.cursor]': '"pointer"',
		'[style.user-select]': '"none"',
	},
})
export class ThemeChangerComponent {
	private readonly appTheme = new BehaviorSubject<string>(localStorage.getItem('theme') ?? 'dark');
	theme = toSignal(
		this.appTheme.pipe(
			tap((theme) => {
				localStorage.setItem('theme', theme);
			}),
		),
		{ initialValue: 'dark' },
	);

	state = signal('');

	showTheme = input(false);

	changeTheme(theme = '') {
		if (theme !== null) {
			this.appTheme.next(theme);
			document.body.setAttribute('data-theme', theme);
		}
		this.state.update((state) => (state === 'closed' ? 'opened' : 'closed'));
	}

	ngOnInit() {
		this.changeTheme(localStorage.getItem('theme') ?? 'dark');
	}

	catchEvent(event: boolean) {
		this.state.set(!event ? 'closed' : 'opened');
	}
}
