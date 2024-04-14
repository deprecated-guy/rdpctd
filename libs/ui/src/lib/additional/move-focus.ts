import { isNativeFocused } from './get-native-focused';

export function moveFocus(currentIndex: number, elements: readonly HTMLElement[], step: number): void {
	currentIndex += step;

	while (currentIndex >= 0 && currentIndex < elements.length) {
		elements[currentIndex].focus();

		if (isNativeFocused(elements[currentIndex])) return;

		currentIndex += step;
	}
}
