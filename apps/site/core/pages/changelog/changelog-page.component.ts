import { Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
	selector: 'app-changelog-page',
	standalone: true,
	template: `
		<markdown class="md" src="/assets/md/CHANGELOG.md"></markdown>
	`,
	styles: [`

			:host {
					display: flex;
					justify-content: center;
					align-items: center;
					color: white;
		}

			.md {
					font-size: 1.1rem;
					line-height: 1.3;
			}
	`],
	imports: [
		MarkdownComponent,
	],
})
export default class ChangelogPageComponent {}