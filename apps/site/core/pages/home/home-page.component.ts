import { Component, computed, signal } from '@angular/core';
import { ScrollSpyDirective } from '@ui/directives';
import { TuiAvatar } from '@taiga-ui/kit';
import { TuiScrollbar } from '@taiga-ui/core';
import { ProgressCardComponent } from '@ui/components/progress-card/progress-card.component';
import { ProgressStepComponent } from '@ui/components/stepper/progress-step.component';

interface Stage {
	name: string;
	image: string | null;
	isChecked: boolean;
}

@Component({
	selector: 'app-home-page',
	standalone: true,
	styleUrl: './home-page.component.scss',
	templateUrl: './home-page.component.html',
	imports: [ScrollSpyDirective, TuiAvatar, TuiScrollbar, ProgressCardComponent, ProgressStepComponent],
})
export default class HomePageComponent {
	readonly devStages = signal<Stage[]>([
		{
			name: 'Thinking an idea',
			image: 'assets/images/svg/idea.svg',
			isChecked: true,
		},
		{
			name: 'Choosing the language for creating backend',
			image: 'assets/images/svg/rust-logo.svg',
			isChecked: true,
		},
		{
			name: 'Adding dependencies',
			image: 'assets/images/svg/deps.svg',
			isChecked: true,
		},
		{
			name: 'Setting up the JWT Generation lib',
			image: 'assets/images/svg/jwt.svg',
			isChecked: true,
		},
		{
			name: 'Researching for best Database Engine',
			image: 'assets/images/svg/database.svg',
			isChecked: false,
		},
		{
			name: 'Setting up the GraphQL and Apollo',
			image: 'assets/images/svg/graphql.svg',
			isChecked: false,
		},
		{
			name: 'Setting Up the Apollo Engine on Front-end',
			image: 'assets/images/svg/apollo.svg',
			isChecked: false,
		},
		{
			name: 'Implementing the Authorization',
			image: 'assets/images/svg/auth.svg',
			isChecked: false,
		},
		{
			name: 'Recreating the home page',
			image: 'assets/images/svg/home.svg',
			isChecked: false,
		},
		{
			name: 'Implementing the realtime deprecation clock',
			image: 'assets/images/svg/clock.svg',
			isChecked: false,
		},
		{
			name: 'Creating the forum threads logic',
			image: 'assets/images/svg/forum.svg',
			isChecked: false,
		},
		{
			name: 'Adding the CV Page',
			image: 'assets/images/svg/cv.svg',
			isChecked: false,
		},
	]);
}
