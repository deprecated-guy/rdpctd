import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent } from '@core/layouts/docs-layout';
import { TabsComponent } from '@ui/components/tabs';
import { NumberPrecisionComponent, icons } from '@ui/components';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
	selector: 'app-docs-precision',
	standalone: true,
	imports: [CommonModule, DocsLayoutComponent, TabsComponent, NumberPrecisionComponent, MarkdownComponent],
	templateUrl: './precision.component.html',
	styleUrl: './precision.component.scss',
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PrecisionComponent {
	tabIndex = 0;
	tabIndexInner = 0;

	protected readonly icons = icons;
}
