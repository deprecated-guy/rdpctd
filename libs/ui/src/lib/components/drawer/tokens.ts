import { BehaviorSubject } from 'rxjs';
import { createDiToken } from '../../di';
import type { DrawerComponent } from './drawer.component';
import { PolymorpheusComponent, PolymorpheusContent } from '@taiga-ui/polymorpheus';

export type Appearance = 'translucent' | 'colored';

interface Context<T> {
	$implicit: T;
}

interface DrawerContext<T> extends Context<T> {
	component: PolymorpheusComponent<DrawerComponent>;
}
export interface Drawer<T> extends DrawerContext<T> {
	id: number;
	title?: string;
	content: PolymorpheusContent;
	appearance?: Appearance;
}

export interface DrawerOptions {
	appearance?: Appearance;
	title?: string;
}

export const DRAWERS = createDiToken(new BehaviorSubject<ReadonlyArray<Drawer<unknown>>>([]));
