import type { OnDestroy, OnInit } from '@angular/core';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TuiAlertService } from '@taiga-ui/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

@Component({
	selector: 'changelog-message',
	standalone: true,
	imports: [
		RouterLink,
	],
	template: 'New update is available. <br>check the <a routerLink="/changelog">changelog</a> <- clickable',
	styles: [`
		:host {

			text-align: center;
		}

		a {

			text-decoration: dotted white 2px;

				&:hover {
					text-decoration: none;
				}
    }
	`],
})
export class ChangelogMessageComponent {}

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
		const content = new PolymorpheusComponent(ChangelogMessageComponent);
		this.open = true;

		this.alertService
			.open(content, {
				label: 'Update',
				status: 'warning',
				autoClose: 2000,
				hasCloseButton: false,
			})
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe();
	}
}