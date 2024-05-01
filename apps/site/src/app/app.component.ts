import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@core/components';
import { DrawerHostComponent } from '@ui/components';
import { AsyncPipe, NgIf } from '@angular/common';
import { DropDownHostComponent } from '@ui/components/drop-down/drop-down-host.component';

@Component({
	standalone: true,
	imports: [RouterModule, HeaderComponent, DrawerHostComponent, AsyncPipe, NgIf, DropDownHostComponent],
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	protected readonly localStorage = localStorage;
}
