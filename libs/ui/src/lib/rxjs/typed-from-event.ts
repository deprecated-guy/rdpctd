import type { Observable } from 'rxjs';
import { fromEvent } from 'rxjs';
import type { EventWith, TypedEventTarget } from './event-with';

export function typedFromEvent<E extends Event, T extends TypedEventTarget<EventWith<E, T>>>(
	target: T,
	event: string,
	options?: AddEventListenerOptions,
): Observable<EventWith<E, T>>;

export function typedFromEvent<E extends Event>(
	target: TypedEventTarget<E>,
	event: string,
	options?: AddEventListenerOptions,
): Observable<E>;

export function typedFromEvent<E extends Event>(
	target: TypedEventTarget<E>,
	event: string,
	options: AddEventListenerOptions = {},
): Observable<E> {
	/**
	 * @note:
	 * in RxJS 7 type signature `TuiTypedEventTarget<E>` !== `HasEventTargetAddRemove<E>`
	 */
	return fromEvent<E>(target as any, event, options) as unknown as Observable<E>;
}
