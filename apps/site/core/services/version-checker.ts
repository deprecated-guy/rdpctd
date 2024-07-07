import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, interval, map, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VersionChecker {
	private readonly version = signal<string | null>(null);
	private readonly http = inject(HttpClient);
	private readonly alertService = inject(TuiAlertService);
	private readonly destroyRef = inject(DestroyRef);

	checkVersion() {
		return interval(10000).pipe(
			switchMap(() => this.http.get('assets/version.txt', { responseType: 'text' }).pipe(
				map(newVersion => {
					if (newVersion !== this.version()) {
						this.version.set(newVersion);
						return this.version();
					}

					return EMPTY;
				}),
			)),
		);
	}
}