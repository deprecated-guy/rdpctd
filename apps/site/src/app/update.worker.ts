/// <reference lib="webworker" />

import { toInt } from '@shared/utils';
import type {
	Observable,
	Subscription,
} from 'rxjs';
import {
	NEVER,
	catchError,
	combineLatest,
	filter,
	from,
	interval,
	switchMap,
} from 'rxjs';

addEventListener('message', ({ data }) => {
	const response = `worker response to ${data}`;
	postMessage(response);
});

function parseVersion(version: string): number {
	const regex = /^(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)-?(?<prefix>rc)?\.?(?<preVersion>\d+)?/;
	const groups = regex.exec(version)?.groups ?? {};

	const major = groups['major'] ?? 0;
	const minor = groups['minor'] ?? 0;
	const patch = groups['patch'] ?? 0;

	return toInt(major) * 1000000 + toInt(minor) * 1000 + toInt(patch);
}

function fetchVersion(): Observable<number> {
	return from(
		fetch('../version')
			.then((response) => {
				return response.text();
			})
			.then((body) => {
				return parseVersion(body);
			}),
	).pipe(
		catchError(() => NEVER),
	);
}

const changed$ = combineLatest([
	fetchVersion(),
	interval(5000).pipe(
		switchMap(() => fetchVersion()),
	),
]).pipe(
	filter(([initialVersion, newVersion]) => newVersion > initialVersion),
);

let subscription: Subscription | null = null;

addEventListener('message', async (ev: MessageEvent<'start' | 'destroy'>) => {
	switch (ev.data) {
		case 'start':
			subscription = changed$.subscribe(() => {
				postMessage('update');
			});
			break;
		case 'destroy':
			subscription?.unsubscribe();
			break;
	}
});