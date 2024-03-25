import { Component } from '@angular/core';
import { interval, map } from 'rxjs';
import { differenceInDays } from 'date-fns';
import { AsyncPipe, I18nPluralPipe } from '@angular/common';
import { PluralPipe } from '@core/pipes';

@Component({
	selector: 'app-home',
	standalone: true,
	template: `
		<h1>While this site is not on production ready.. :(</h1>
		<br />
		<p>Please listen this music. It track literally top up your happiness. :)</p>
		<br />
		<div class="block">
			<iframe
				width="auto"
				height="auto"
				src="https://www.youtube.com/embed/d-diB65scQU?si=CsMJQ4vysDrcYQKp"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
			></iframe>
			<div class="counter">time has passed: {{ count | async | plural : 'day' : 'days' }}</div>
		</div>

		<p>I paste puppy dog picture</p>
		<br />
		<img
			style="max-width: 400px"
			src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Cute_dog.jpg/1600px-Cute_dog.jpg?20140729055059"
			alt=""
		/>
		<br />
		<p>Don't worry. I started developing this site currently. ;)</p>
		<br />
		<p>Thanks for waiting! ;)</p>
	`,
	styles: `
    iframe {
      max-width: 30rem;
      height: 22rem;
    }
    .block {
      display: flex;
      gap: 1.2rem;

      @media (max-width: 768px) {
        flex-direction: column-reverse;
      }
    }

    .counter {
      background: #032341;
      border-radius: 0.3rem;
      padding: 0.1rem 0.5rem;
      color: #f4f4f4;
      height: 1.56rem;
      max-width: 12rem;
    }
  `,
	imports: [AsyncPipe, I18nPluralPipe, PluralPipe],
})
export default class HomPageComponent {
	count = interval(1000).pipe(
		map(() => {
			const startDate = new Date('2024-03-24');
			const currentDate = new Date();
			return differenceInDays(currentDate, startDate);
		}),
	);
}
