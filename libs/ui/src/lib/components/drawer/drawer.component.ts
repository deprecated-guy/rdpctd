import type { ElementRef, OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkActive } from '@angular/router';
import { TuiActiveZone } from '@taiga-ui/cdk';
import type { BehaviorSubject } from 'rxjs';
import type { Drawer } from './tokens';
import { DRAWERS } from './tokens';
import { POLYMORPHEUS_CONTEXT, PolymorpheusOutlet } from '@taiga-ui/polymorpheus';

@Component({
	selector: 'app-drawer',
	standalone: true,
	imports: [CommonModule, PolymorpheusOutlet, TuiActiveZone],
	templateUrl: './drawer.component.html',
	styleUrl: './drawer.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [RouterLinkActive],
})
export class DrawerComponent implements OnInit {
	private readonly drawerElement = viewChild<ElementRef<HTMLElement>>('drawer');

	constructor(
		@Inject(POLYMORPHEUS_CONTEXT) readonly context: Drawer<unknown>,
		@Inject(DRAWERS) private readonly drawersSubject: BehaviorSubject<Drawer<unknown>[]>,
	) {}

	ngOnInit(): void {
		this.drawerElement()?.nativeElement.classList.add('opened');
	}

	onActiveZoneChange(isActive: boolean): void {
		if (!isActive) {
			this.closeDrawer();
		}
	}

	private closeDrawer(): void {
		const element = this.drawerElement()?.nativeElement;
		if (element) {
			element.classList.remove('open');
			element.classList.add('closed');
		}
		this.drawersSubject.next([]);
	}
}
