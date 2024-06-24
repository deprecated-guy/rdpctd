import { Component, ElementRef, HostListener, Inject, inject } from '@angular/core';
import { POLYMORPHEUS_CONTEXT, PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import type { DialogSettings } from '@ui/components/dialog/dialog.service';
import { DIALOGS } from '@ui/components/dialog/dialog.service';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-dialog',
	templateUrl: './dialog.component.html',
	standalone: true,
	imports: [
		PolymorpheusModule,
	],
})
export class DialogComponent {
	readonly close = new Subject<void>();
	private readonly element = inject(ElementRef).nativeElement;
	private readonly DIALOGS = inject(DIALOGS);

	constructor(
		@Inject(POLYMORPHEUS_CONTEXT)
		public readonly context: DialogSettings,
	) {
	}

	@HostListener('document:click', ['$event'])
	onClick(event: MouseEvent) {
		if (!this.element.contains(event.target as Node))
			this.DIALOGS.next(this.DIALOGS.value.filter(dialog => dialog.id !== this.context.id));
	}

	@HostListener('document:keydown', ['$event'])
	onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && !this.element.contains(event.target as Node))
			this.DIALOGS.next(this.DIALOGS.value.filter(dialog => dialog.id !== this.context.id));
	}
}