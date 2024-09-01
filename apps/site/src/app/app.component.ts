import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@core/components';
import { DrawerHostComponent } from '@ui/components';
import { DropDownHostComponent } from '@ui/components/drop-down/drop-down-host.component';
import { FooterComponent } from '@core/components/footer/footer.component';
import { UpdateAlertsComponent } from './update-alert/update-alert.component';
import { TuiAlertService, TuiRoot } from '@taiga-ui/core';

@Component({
	standalone: true,
	imports: [
		RouterModule,
		HeaderComponent,
		DrawerHostComponent,
		DropDownHostComponent,
		TuiRoot,
		UpdateAlertsComponent,
		FooterComponent,
	],
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
}
