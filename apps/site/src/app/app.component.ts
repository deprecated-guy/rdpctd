import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@core/components';
import { DrawerHostComponent } from '@ui/components';
import { AsyncPipe, NgIf } from '@angular/common';
import { DropDownHostComponent } from '@ui/components/drop-down/drop-down-host.component';
import type { TuiBrightness } from '@taiga-ui/core';
import { TuiModeModule, TuiRootModule, TuiSvgDefsHostModule, TuiThemeNightModule } from '@taiga-ui/core';
import { FooterComponent } from '@core/components/footer/footer.component';
import { UpdateAlertsComponent } from './update-alert/update-alert.component';

@Component({
	standalone: true,
	imports: [
		RouterModule,
		HeaderComponent,
		DrawerHostComponent,
		AsyncPipe,
		NgIf,
		DropDownHostComponent,
		TuiRootModule,
		TuiModeModule,
		TuiThemeNightModule,
		TuiSvgDefsHostModule,
		UpdateAlertsComponent,
		FooterComponent,
	],
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	protected readonly localStorage = localStorage;
	protected readonly window = window;
	readonly theme = signal<TuiBrightness | null>(null);
}
