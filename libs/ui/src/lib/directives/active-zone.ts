import { distinctUntilChanged, fromEvent, mapTo, merge, of, share, switchMap, take, takeUntil, timer } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { InjectionToken, inject } from '@angular/core';

export const ACTIVE_ELEMENT = new InjectionToken('active element', {
	factory: () => {
		const documentRef = inject(DOCUMENT);
		const windowRef = documentRef.defaultView;
		const focusout$ = fromEvent(windowRef!, 'focusout');
		const mousedown$ = fromEvent(windowRef!, 'mousedown');
		const mouseuEnter$ = fromEvent(windowRef!, 'mouseenter');

		const mouse$ = merge(
			mousedown$.pipe(
				switchMap(({ target }) =>
					documentRef.activeElement === documentRef.body
						? of(target)
						: focusout$.pipe(take(1), takeUntil(timer(0)), mapTo(target)),
				),
			),
			mouseuEnter$.pipe(
				switchMap(({ target }) =>
					documentRef.activeElement === documentRef.body
						? of(target)
						: focusout$.pipe(take(1), takeUntil(timer(0)), mapTo(target)),
				),
			),
		);
		return merge(mouse$).pipe(distinctUntilChanged(), share());
	},
});
