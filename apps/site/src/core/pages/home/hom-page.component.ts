import { Component } from '@angular/core';
import { AsyncPipe, I18nPluralPipe } from '@angular/common';
import { PluralPipe } from '@core/pipes';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
	selector: 'app-home',
	standalone: true,
	template:
		' <markdown src="assets/md/CHANGELOG.md"></markdown><br><markdown src="assets/md/page-content.md"></markdown>',
	imports: [AsyncPipe, I18nPluralPipe, PluralPipe, MarkdownComponent],
	styles: `
@use "@app/styles/media.scss";

  ::ng-deep markdown img{
    max-width: 44rem;
    width: auto;
    margin: 0 auto;

    @media #{media.$mobile} {
      margin: 0;
      max-width: 17rem;
    }
  }
  `,
})
export default class HomPageComponent {}
