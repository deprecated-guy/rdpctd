import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent } from '@core/layouts/docs-layout';

@Component({
	selector: 'app-docs-home',
	standalone: true,
	imports: [CommonModule, DocsLayoutComponent],
	templateUrl: './docs-home.component.html',
	styleUrl: './docs-home.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DocsHomeComponent {}
