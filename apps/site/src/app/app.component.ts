import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@core/components';

@Component({
	standalone: true,
	imports: [RouterModule, HeaderComponent],
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'site';
	protected readonly localStorage = localStorage;
}
