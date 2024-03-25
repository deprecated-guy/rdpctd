import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../core/components/header/header.component';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
	standalone: true,
	imports: [NxWelcomeComponent, RouterModule, HeaderComponent],
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'site';
}
