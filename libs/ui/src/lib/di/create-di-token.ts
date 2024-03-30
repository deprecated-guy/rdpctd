import { InjectionToken } from '@angular/core';

export function createDiToken<T>(defaults: T, name?: string) {
	return createTokenFromFactory(name ?? '', () => defaults);
}
function createTokenFromFactory<T>(name: string, factory: () => T) {
	return new InjectionToken<T>(name, {
		factory,
	});
}
