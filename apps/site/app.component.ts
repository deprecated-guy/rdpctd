import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@core/components';
import { DrawerHostComponent } from '@ui/components';
import { DropDownHostComponent } from '@ui/components/drop-down/drop-down-host.component';
import { FooterComponent } from '@core/components/footer/footer.component';
import { TuiRoot } from '@taiga-ui/core';
import { UpdateAlertsComponent } from './update-alert/update-alert.component';


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
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
