export function isNativeFocused(node?: Node | null): boolean {
	return !!node?.ownerDocument && getNativeFocused(node.ownerDocument) === node && node.ownerDocument.hasFocus();
}

export function getNativeFocused({ activeElement }: Document): Element | null {
	if (!activeElement?.shadowRoot) return activeElement;

	let element = activeElement.shadowRoot.activeElement;

	while (element?.shadowRoot) element = element.shadowRoot.activeElement;

	return element;
}
