import { Component, inject } from '@angular/core';
import { DROPDOWNS } from '@ui/components/drop-down/constants';
import { AsyncPipe } from '@angular/common';
import { PolymorpheusOutlet } from '@taiga-ui/polymorpheus';

@Component({
	selector: 'app-drop-down-host',
	standalone: true,
	template: `
		<section>
			@for (item of dropdowns | async; track $index) {
			<div>
				<ng-container *polymorpheusOutlet="item.component; context: item"></ng-container>
			</div>
			}
		</section>
	`,
	styles: [
		`
			:host {
				position: fixed;
				width: 100%;
				height: 100%;
			}

			section {
				position: absolute;
			}
			[appLink] {
				~ section {
					position: absolute !important;
				}
				position: relative;
			}
		`,
	],
	imports: [PolymorpheusOutlet, AsyncPipe],
})
export class DropDownHostComponent {
	readonly dropdowns = inject(DROPDOWNS);
}
