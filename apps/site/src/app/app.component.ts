import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '@core/components';
import { DrawerHostComponent } from '@ui/components';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
	standalone: true,
	imports: [RouterModule, HeaderComponent, DrawerHostComponent],
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	private readonly router = inject(Router);
	readonly hiddenHeader = toSignal(
		this.router.events.pipe(
			map((event) => {
				if (event instanceof NavigationEnd && this.router.url.startsWith('/docs')) return true;
				return false;
			}),
		),
		{
			initialValue: false,
		},
	);

	protected readonly localStorage = localStorage;
}