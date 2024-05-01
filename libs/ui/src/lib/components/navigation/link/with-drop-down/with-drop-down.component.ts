import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveZoneDirective, CenterizeElementDirective } from '@ui/directives';
import type { Icon } from '@ui/components';
import { IconComponent } from '@ui/components';
import { type PolymorpheusContent, PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'a[appLinkWithDropDown], button[appLinkWithDropDown]',
	standalone: true,
	templateUrl: './with-drop-down.component.html',
	styleUrl: './with-drop-down.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('dropDownAnimation', [
			transition(':enter', [
				style({ opacity: 0, transform: 'translateY(-20px)' }),
				animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
			]),
			transition(':leave', [animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))]),
		]),
	],
	imports: [CommonModule, ActiveZoneDirective, IconComponent, PolymorpheusModule, CenterizeElementDirective],
})
export class WithDropDownComponent {
	dropdownOpened = false;
	icon = input<Icon>();
	iconRight = input<Icon>();
	dropdown = input<PolymorpheusContent>(null);
}
