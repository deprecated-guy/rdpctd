import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { IconComponent } from '@ui/components';
import { themeChangerAnimation } from '@ui/animations';

@Component({
	selector: 'app-theme-changer',
	standalone: true,
	imports: [CommonModule, IconComponent],
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
	readonly theme = new BehaviorSubject<string>(localStorage.getItem('theme') ?? 'dark');

	changeTheme() {
		this.theme.next(this.theme.value === 'dark' ? 'light' : 'dark');
		localStorage.setItem('theme', this.theme.value);
		document.body.setAttribute('data-theme', this.theme.value);
	}

	ngOnInit() {
		document.body.setAttribute('data-theme', this.theme.value);
	}
}
