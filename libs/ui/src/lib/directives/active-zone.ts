import type {
	Observable,
} from 'rxjs';
import {
	BehaviorSubject,
	distinctUntilChanged,
	filter,
	fromEvent,
	map,
	mapTo,
	merge,
	of,
	repeatWhen,
	share,
	startWith,
	switchMap,
	take,
	takeUntil,
	timer,
	withLatestFrom,
} from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { InjectionToken, inject } from '@angular/core';
import { ɵAnimationEngine } from '@angular/animations/browser';

const REMOVED_ELEMENT = new InjectionToken<Observable<Element | null>>(
	'Element currently being removed by AnimationEngine',
	{
		factory: () => {
			const stub = { onRemovalComplete: () => {} };
			const skip$ = new BehaviorSubject<Element | null>(null);
			const engine = ɵAnimationEngine
				? inject(ɵAnimationEngine, { optional: true }) ?? stub
				: stub;
			const { onRemovalComplete = stub.onRemovalComplete } = engine;

			engine.onRemovalComplete = (element, context) => {
				skip$.next(element);
				onRemovalComplete(element, context);
			};

			return skip$.pipe(
				switchMap(element =>
					timer(0).pipe(
						mapTo(null),
						startWith(element),
					),
				),
				share(),
			);
		},
	},
);

export const ACTIVE_ELEMENT = new InjectionToken(
	'An element that user is currently interacting with',
	{
		factory: () => {
			const documentRef = inject(DOCUMENT);
			const windowRef = documentRef.defaultView;
			const blur$ = fromEvent(windowRef!, 'blur');
			const focusout$ = fromEvent<FocusEvent>(windowRef!, 'focusout');
			const focusin$ = fromEvent(windowRef!, 'focusin');
			const mousedown$ = fromEvent(windowRef!, 'mousedown');
			const mouseEnter$ = fromEvent(windowRef!, 'mouseenter');
			const mouseup$ = fromEvent(windowRef!, 'mouseup');

			const iframe$ = blur$.pipe(
				map(() => documentRef.activeElement),
				filter(element => !!element && element.matches('iframe')),
			);
			const gain$ = focusin$.pipe(
				switchMap(event => {
					const target = getActualTarget(event);
					const root = getDocumentOrShadowRoot(target as Node);

					return root === documentRef
						? of(target)
						: shadowRootActiveElement(root as Node).pipe(startWith(target));
				}),
			);
			const loss$ = focusout$.pipe(
				takeUntil(mousedown$),
				repeatWhen(() => mouseup$),
				withLatestFrom(inject(REMOVED_ELEMENT)),
				filter(([event, removedElement]) =>
					isValidFocusout(getActualTarget(event), removedElement),
				),
 				map(([{ relatedTarget }]) => relatedTarget),
			);
			const mouse$ = merge(
				mousedown$.pipe(
					switchMap(({ target }) =>
						documentRef.activeElement === documentRef.body
							? of(target)
							: focusout$.pipe(
								take(1),
								takeUntil(timer(0)),
								mapTo(target),
							),
					),
				),
				mouseEnter$.pipe(
					switchMap(({ target }) =>
						documentRef.activeElement === documentRef.body
							? of(target)
							: focusout$.pipe(
								take(1),
								takeUntil(timer(0)),
								mapTo(target),
							),
					),
				),
			);

			return merge(loss$, gain$, mouse$, iframe$).pipe(
				distinctUntilChanged(),
				share(),
			);
		},
	},
);

function isValidFocusout(target: any, removedElement: Element | null): boolean {
	return (
		// Not due to switching tabs/going to DevTools
		target.ownerDocument?.activeElement !== target &&
		// Not due to button/input becoming disabled
		!target.disabled &&
		// Not due to element being removed from DOM
		(!removedElement || !removedElement.contains(target))
	);
}

function getActualTarget(event: Event): EventTarget {
	return event.composedPath()[0];
}

function getDocumentOrShadowRoot(node: Node): Node | null {
	return node.isConnected ? node.getRootNode() : node.ownerDocument;
}

function shadowRootActiveElement(root: Node): Observable<EventTarget | null> {
	return merge(
		fromEvent(root, 'focusin').pipe(map(({ target }) => target)),
		fromEvent<FocusEvent>(root, 'focusout').pipe(
			filter(({ target }) => isValidFocusout(target, null)),
			map(({ relatedTarget }) => relatedTarget),
		),
	);
}