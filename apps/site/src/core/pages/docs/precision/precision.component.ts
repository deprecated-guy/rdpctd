import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent } from '@core/layouts/docs-layout';

@Component({
	selector: 'app-docs-precision',
	standalone: true,
	imports: [CommonModule, DocsLayoutComponent],
	templateUrl: './precision.component.html',
	styleUrl: './precision.component.scss',
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PrecisionComponent {}
