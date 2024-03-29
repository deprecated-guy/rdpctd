import { Component } from '@angular/core';
import { AsyncPipe, I18nPluralPipe } from '@angular/common';
import { PluralPipe } from '@core/pipes';

@Component({
	selector: 'app-home',
	standalone: true,
	template: `
		<h1>While this site is not on production ready.. :(</h1>
		<div class="block">
			<audio src="https://cdn.rdpctd.dev/assets/audio/1.mp3" autoplay="1"></audio>
		</div>

		<p>I paste puppy dog picture</p>
		<br />
		<img style="width: 100%;" src="https://shorturl.at/nCE12" alt="" />
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
  `,
	imports: [AsyncPipe, I18nPluralPipe, PluralPipe],
})
export default class HomPageComponent {}
