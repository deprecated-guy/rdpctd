import { Component, computed } from '@angular/core';
import * as luxon from 'luxon';

@Component({
	selector: 'app-footer',
	standalone: true,
	templateUrl: 'footer.component.html',
	styleUrls: ['footer.component.scss'],
})
export class FooterComponent {
	readonly powerDate = computed(() => {
		const firstCommitDate = luxon.DateTime.fromJSDate(new Date('2024-03-31'));
		const now = luxon.DateTime.now();
		const difference = Math.floor(now.diff(firstCommitDate, 'days').days);
		const daysPassed = `(${difference} days passed)`;

		return `${firstCommitDate.year}- ${now.year}${daysPassed}`;
	});
}