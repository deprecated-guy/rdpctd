import type { OnInit } from '@angular/core';
import { Component, inject, input } from '@angular/core';
import { HighlightService } from './highlight.service';

@Component({
	selector: 'app-prism',
	standalone: true,
	template: ` <pre class="language-typescript line-numbers" data-start="1">
		<code>
			<ng-content></ng-content>
		</code>
	</pre>`,
	styles: [
		`
			pre {
				white-space: pre-wrap;
			}
		`,
	],
})
export class PrismComponent implements OnInit {
	private readonly highlightService = inject(HighlightService);
	readonly language = input('javascript');

	ngOnInit() {
		this.highlightService.highlight();
	}
}
