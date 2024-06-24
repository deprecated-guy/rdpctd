import { Component, inject } from '@angular/core';
import { DIALOGS } from '@ui/components/dialog/dialog.service';
import { AsyncPipe } from '@angular/common';
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';

@Component({
	selector: 'app-dialog-host',
	standalone: true,
	templateUrl: './dialog-host.component.html',
	imports: [
		AsyncPipe,
		PolymorpheusModule,
	],
})
export class DialogHostComponent {
	protected readonly dialogs = inject(DIALOGS);
	protected readonly inject = inject;
}