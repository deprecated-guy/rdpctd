import type { ElementRef } from '@angular/core';
import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation, inject, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { POLYMORPHEUS_CONTEXT, PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import { EventOutsideDirective } from '../../directives';
import { ThemeChangerComponent } from '../theme-changer/theme-changer.component';
import type { Drawer } from './tokens';
import { DRAWERS } from './tokens';

@Component({
	selector: 'app-drawer',
	standalone: true,
	imports: [CommonModule, PolymorpheusModule, EventOutsideDirective, ThemeChangerComponent],
	templateUrl: './drawer.component.html',
	styleUrl: './drawer.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [],
	providers: [],
})
export class DrawerComponent {
	private readonly drawer = viewChild<ElementRef<HTMLElement>>('drawer');
	private readonly drawers = inject(DRAWERS);

	close() {
		this.context.$implicit.complete();
	}

	ngOnInit() {
		this.drawer()?.nativeElement.classList.add('opened');
	}

	constructor(@Inject(POLYMORPHEUS_CONTEXT) readonly context: Drawer<any>) {}

	catchEvent(event: boolean) {
		if (!event) {
			this.drawer()!.nativeElement.classList.remove('open');
			this.drawer()!.nativeElement.classList.add('closed');

			this.drawers.next([]);
		}
	}
}
