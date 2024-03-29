import type { ElementRef } from '@angular/core';
import { Component, DestroyRef, inject, viewChild } from '@angular/core';
import { AsyncPipe, I18nPluralPipe } from '@angular/common';
import { PluralPipe } from '@core/pipes';
import { interval, takeUntil, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyService } from '../../../../../../libs/ui/src/lib/services';

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
export default class HomPageComponent {
	private readonly destroyService = inject(DestroyService);
	private readonly destroyRef = inject(DestroyRef);

	private readonly audio = viewChild<ElementRef<HTMLAudioElement>>('audio');
	readonly playing = interval(1000).pipe(tap(() => this.audio()?.nativeElement.play()));

	ngOnInit() {
		this.playing.pipe(takeUntilDestroyed(this.destroyRef), takeUntil(this.destroyService)).subscribe();
	}
}
