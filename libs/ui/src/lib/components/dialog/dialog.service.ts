import { Injectable, inject } from '@angular/core';
import type { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { BehaviorSubject, Observable } from 'rxjs';
import { createDiToken } from '@ui/di';
import { IdService } from '@ui/services';
import { DialogComponent } from '@ui/components/dialog/dialog.component';

export type DialogAppearance = 'mobile' | 'desktop' | 'fullscreen';

export interface Context<T = unknown> {
	$implicit: T;
}

export type DialogContext<T = unknown> = Context & {
	component: PolymorpheusComponent<T>;
};

export interface DialogSettings extends DialogContext {
	id: string;
	appearance: DialogAppearance;
	content: PolymorpheusContent;
	dismisable?: boolean;
	heading?: string;
}

export const DIALOGS = createDiToken(new BehaviorSubject<ReadonlyArray<DialogSettings>>([]));

@Injectable({ providedIn: 'root' })
export class DialogService {
	private readonly dialogs = inject(DIALOGS);
	private readonly id = inject(IdService);

	open(
		content: PolymorpheusContent,
		settings: Omit<DialogSettings, 'context' | 'content'>,
	): Observable<DialogSettings> {
		return new Observable<DialogSettings>(
			(observer) => {
				const component = new PolymorpheusComponent(DialogComponent);
				const dialog = {
					id: this.id.generate(),
					...settings,
					$implicit: observer,
					component,
					content,
				};

				this.dialogs.next([...this.dialogs.value, dialog]);

				observer.next(dialog);
			},

		);
	}
}