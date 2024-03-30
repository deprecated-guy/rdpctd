import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@core/components';
import { DrawerHostComponent } from '../../../../libs/ui/src/lib/components/drawer';

@Component({
	standalone: true,
	imports: [RouterModule, HeaderComponent, DrawerHostComponent],
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'site';
	protected readonly localStorage = localStorage;
}
