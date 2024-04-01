import { Component } from '@angular/core';
import { AsyncPipe, I18nPluralPipe } from '@angular/common';
import { PluralPipe } from '@core/pipes';
import { MarkdownComponent } from 'ngx-markdown';
import { DragDirective, DragMoveDirective, DragPlaceholder, ListDraggableDirective } from '@ui/directives';

@Component({
	selector: 'app-home',
	standalone: true,
	template: ` <ul listDraggable class="area">
			<li class="box" drag>123</li>
			<li class="box" drag>
				123

				<ng-template dragPlaceholder let-position>
					<div
						class="helper"
						[attr.draggable]="true"
						[style.left]="position.x / 16 + 'rem'"
						[style.top]="position.y / 16 + 'rem'"
					>
						helper
					</div>
				</ng-template>
			</li>
		</ul>

		<ng-template #test></ng-template>
		<div class="box" drag>123</div>
		<markdown src="assets/md/CHANGELOG.md"></markdown><br /><markdown src="assets/md/page-content.md"></markdown>`,
	imports: [
		AsyncPipe,
		I18nPluralPipe,
		PluralPipe,
		MarkdownComponent,
		DragDirective,
		DragMoveDirective,
		ListDraggableDirective,
		DragPlaceholder,
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
