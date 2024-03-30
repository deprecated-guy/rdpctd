import { ChangeDetectionStrategy, Component, ViewEncapsulation, input, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import type { ApplicationRouterLink } from '../../../../services';
import type { LinkAppearance } from '../link.component';
import { LinkComponent } from '../link.component';
import { IconComponent } from '../../../icon/icon.component';

@Component({
	selector: 'a[appLinkExpandable], button[appLinkExpandable]',
	standalone: true,
	imports: [CommonModule, LinkComponent, RouterLink, IconComponent],
	templateUrl: './link-expandable.component.html',
	styleUrl: './link-expandable.component.scss',
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('expand', [
			state(
				'closed',
				style({
					transform: 'translateY(-20px)',
					opacity: 0,
					height: 0,
				}),
			),
			state(
				'expanded',
				style({
					transform: 'translateY(0)',
					opacity: 1,
					height: '*',
				}),
			),
			transition('expanded<=>closed', animate(200)),
		]),
	],
})
export class LinkExpandableComponent {
	private readonly children = viewChild('children');
	link = input<ApplicationRouterLink>();
	appearance = input<LinkAppearance>('default');
	state = signal('closed');

	updateState() {
		this.state.update((state) => (state === 'closed' ? 'expanded' : 'closed'));
	}
}
