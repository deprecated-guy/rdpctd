import { InjectionToken } from '@angular/core';

export function createDiToken<T>(defaults: T, name?: string) {
	return createTokenFromFactory(name ?? '', () => defaults);
}
function createTokenFromFactory<T = any>(name: string, factory: () => T) {
	return new InjectionToken<T>(name, {
		factory,
	});
}
