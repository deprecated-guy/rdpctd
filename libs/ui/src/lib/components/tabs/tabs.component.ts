import type { AfterViewChecked, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, input, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import type { Icon } from '@ui/components';
import { IconComponent } from '@ui/components';

export interface Tab {
	icon?: Icon;
	title: string;
	active?: boolean;
}

@Component({
	selector: 'app-tabs',
	standalone: true,
	imports: [CommonModule, PolymorpheusModule, IconComponent],
	templateUrl: './tabs.component.html',
	styleUrl: './tabs.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent implements OnInit, AfterViewInit, AfterViewChecked {
	@Output() indexChange = new EventEmitter<number>();
	tab = viewChild<ElementRef<HTMLElement>>('tab');

	tabs = input<Tab[]>([]);
	underlineWidth!: string;
	tabTranslation = '0px';

	ngOnInit() {
		this.tabs()[0].active = true;
	}

	ngAfterViewInit() {
		this.underlineWidth = `${(Array.from(document.querySelectorAll('.tab')) as HTMLElement[])[0].offsetWidth}px`;
		this.tabs()[0].active = true;
	}

	ngAfterViewChecked() {
		this.selectTab(this.tabs()[0]);
	}

	selectTab(tab: Tab) {
		this.tabs().forEach((t) => (t.active = false));
		this.tabs()[this.tabs().indexOf(tab)].active = true;
		const child = (Array.from(document.querySelectorAll('.tab')) as HTMLElement[])[this.tabs().indexOf(tab)];
		this.underlineWidth = `${child.offsetWidth}px`;
		this.tabTranslation = `translateX(${child.offsetLeft - this.tab()!.nativeElement.offsetLeft}px)`;

		this.indexChange.emit(this.tabs().indexOf(tab));
	}
}
