import { createDiToken } from '@ui/di';
import type { PolymorpheusComponent, PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { BehaviorSubject } from 'rxjs';

export interface Context<T> {
	$implicit: T;
}

export type DropdownContext<T> = Context<
	T & {
		content: PolymorpheusContent;
	}
>;

export interface DropdownOptions<T = unknown> extends DropdownContext<T> {
	component: PolymorpheusComponent<T>;
	id: string;
	appearance: string;
}

export const DROPDOWNS = createDiToken(new BehaviorSubject<ReadonlyArray<DropdownOptions>>([]));
