import type { OnDestroy, OnInit } from '@angular/core';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TuiAlertService } from '@taiga-ui/core';
import { RouterLink } from '@angular/router';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';

@Component({
	selector: 'changelog-message',
	standalone: true,
	imports: [RouterLink],
	template: 'Доступно новое обновление. <br>Проверьте <a routerLink="/changelog">список изменений</a> <- кликабельно',
	styles: [
		`
			:host {
				text-align: center;
			}

			a {
				text-decoration: dotted white 2px;

				&:hover {
					text-decoration: none;
				}
			}
		`,
	],
})
export class ChangelogMessageComponent {}

@Component({
	selector: 'app-update-alerts',
	template: '',
	standalone: true,
	styles: [''],
})
export class UpdateAlertsComponent implements OnInit, OnDestroy {
	private readonly alertService = inject(TuiAlertService);
	private readonly destroyRef = inject(DestroyRef);
	private worker?: Worker;
	private currentVersion: string = '';

	ngOnInit(): void {
		if (typeof Worker === 'undefined') return;

		this.initializeWorker();
	}

	ngOnDestroy(): void {
		this.terminateWorker();
	}

	private initializeWorker(): void {
		this.worker = new Worker(new URL('../update.worker', import.meta.url));

		this.worker.onmessage = this.handleWorkerMessage.bind(this);

		this.worker.postMessage({ type: 'START', currentVersion: this.currentVersion });
	}

	private handleWorkerMessage(event: MessageEvent): void {
		if (event.data.type === 'VERSION_CHANGE' && event.data.version !== this.currentVersion) {
			this.currentVersion = event.data.version;
			this.showAlert();
		}
	}

	private terminateWorker(): void {
		if (this.worker) {
			this.worker.postMessage({ type: 'DESTROY' });
			this.worker.terminate();
			this.worker = undefined;
		}
	}

	private showAlert(): void {
		const content = new PolymorpheusComponent(ChangelogMessageComponent);

		this.alertService
			.open(content, {
				label: 'Обновление',
				autoClose: 5000,
				closeable: true,
			})
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe();
	}
}
