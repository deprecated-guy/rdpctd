import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-theme-changer',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './theme-changer.component.html',
	styleUrl: './theme-changer.component.scss',
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeChangerComponent {}
