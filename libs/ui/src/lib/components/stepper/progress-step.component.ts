import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-progress-step',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './progress-step.component.html',
	styleUrl: './progress-step.component.scss',
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressStepComponent {
	readonly isActive = input.required<boolean>();
}
