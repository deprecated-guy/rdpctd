import { Component } from '@angular/core';
import { AsyncPipe, I18nPluralPipe } from '@angular/common';
import { PluralPipe } from '@core/pipes';
import { MarkdownComponent } from 'ngx-markdown';
import { DragDirective, DragMoveDirective, DragPlaceholder, ListDraggableDirective } from '@ui/directives';
import { PrismComponent } from '@shared/prism';

@Component({
	selector: 'app-home',
	standalone: true,
	templateUrl: './hom-page.component.html',
	imports: [
		AsyncPipe,
		I18nPluralPipe,
		PluralPipe,
		MarkdownComponent,
		DragDirective,
		DragMoveDirective,
		ListDraggableDirective,
		DragPlaceholder,
		PrismComponent,
	],
	styles: `
    @use "@app/styles/media.scss";



    .box {
      padding: 0.5rem;
      background: yellow;
      width: 50px;
      color: black;

      &.dragging {
        background: coral;
      }
    }

    ::ng-deep markdown img {
      max-width: 44rem;
      width: auto;
      margin: 0 auto;

      @media #{media.$mobile} {
        margin: 0;
        max-width: 17rem;
      }
    }

    .area {
      width: 400px;
      height: 150px;
      background: #278273;
      padding: 0.3rem;
    }
  `,
})
export default class HomPageComponent {}
