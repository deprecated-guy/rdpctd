import { ChangeDetectionStrategy, Component, computed, input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	PolymorpheusComponent,
	PolymorpheusContent,
	PolymorpheusOutlet,
	PolymorpheusTemplate,
} from '@taiga-ui/polymorpheus';
import { PolymorpheusContext } from '@taiga-ui/polymorpheus/classes/context';
import { ProgressStepComponent } from '@ui/components/stepper/progress-step.component';

@Component({
	selector: 'site-progress-card',
	standalone: true,
	imports: [CommonModule, PolymorpheusTemplate, PolymorpheusOutlet, ProgressStepComponent],
	templateUrl: './progress-card.component.html',
	styleUrl: './progress-card.component.scss',
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressCardComponent {
	readonly image = input<string | null>(null);
	readonly name = input<string | null>(null);

	readonly content = input<PolymorpheusContent>();

	readonly isActive = input<boolean>(false);
	readonly showStep = input<boolean>(false);
	readonly firstLetter = computed(() => this.name()?.charAt(0).toUpperCase());
}
