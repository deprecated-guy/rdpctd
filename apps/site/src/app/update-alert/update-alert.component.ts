import type { OnDestroy, OnInit } from '@angular/core';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TuiAlertService } from '@taiga-ui/core';
import { AsyncPipe } from '@angular/common';

@Component({
	selector: 'app-update-alerts',
	template: '',
	standalone: true,
	styles: [''],
	imports: [
		AsyncPipe,
	],
})
export class UpdateAlertsComponent implements OnInit, OnDestroy {
	private readonly alertService = inject(TuiAlertService);
	private readonly destroyRef = inject(DestroyRef);
	worker?: Worker;

	open = false;

	ngOnInit(): void {
		if (typeof Worker === 'undefined')
			return;

		this.worker = new Worker(new URL('../update.worker', import.meta.url));

		this.worker.onmessage = () => {
			if (!this.open)
				this.show();
		};

		this.worker.postMessage('start');
	}

	ngOnDestroy(): void {
		this.worker?.postMessage('destroy');
		this.worker?.terminate();
	}

	constructor() {
		this.worker = new Worker(new URL('../update.worker', import.meta.url));
	}

	show(): void {
		this.open = true;

		this.alertService
			.open('New update is available. check he <a routerLink="/changelog">changelog</a>!', {
				label: 'Update',
				status: 'warning',
				autoClose: false,
				hasCloseButton: false,
			})
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe();
	}
}