import { Component } from '@angular/core';
import { ScrollSpyDirective } from '@ui/directives';
import { TuiAvatar } from '@taiga-ui/kit';

@Component({
	selector: 'app-home-page',
	standalone: true,
	styleUrl: './home-page.component.scss',
	templateUrl: './home-page.component.html',
	imports: [
		ScrollSpyDirective,
		TuiAvatar,
	],
})
export default class HomePageComponent {}
