import { Component } from '@angular/core';
import { AsyncPipe, I18nPluralPipe } from '@angular/common';
import { PluralPipe } from '@core/pipes';

@Component({
	selector: 'app-home',
	standalone: true,
	template: `
		<h1>While this site is not on production ready.. :(</h1>
		<div class="block">
			<audio autoplay controls #audio muted loop>
				<source src="https://cdn.rdpctd.dev/assets/audio/1.mp3" type="audio/mp3" />
			</audio>
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
    @use "@app/styles/media.scss";

    iframe {
      max-width: 30rem;
      height: 22rem;
    }
    .block {
      display: flex;
      gap: 1.2rem;

      @media #{media.$mobile} {
        flex-direction: column-reverse;
      }
    }

    audio {
      @media #{media.$mobile} {
      display: none;
    }
    }
  `,
	imports: [AsyncPipe, I18nPluralPipe, PluralPipe],
})
export default class HomPageComponent {}
