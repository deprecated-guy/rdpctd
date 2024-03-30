export function getViewportWidth({ document, innerWidth }: Window): number {
	return Math.max(document.documentElement.clientWidth || 0, innerWidth || 0);
}
