import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '@core/components';
import { DrawerHostComponent } from '@ui/components';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
	standalone: true,
	imports: [RouterModule, HeaderComponent, DrawerHostComponent, AsyncPipe, NgIf],
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	private readonly router = inject(Router);

	readonly hiddenHeader = toSignal(
		this.router.events.pipe(
			map(() => {
				if (this.router.url.startsWith('/(docs:docs')) return true;
				return false;
			}),
		),
		{
			initialValue: false,
		},
	);

	protected readonly localStorage = localStorage;
}
