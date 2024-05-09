import 'jest-preset-angular/setup-jest';

(globalThis as any).ngJest = {
	testEnvironmentOptions: {
		errorOnUnknownElements: true,
		errorOnUnknownProperties: true,
	},
};
