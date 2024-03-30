export function isInput(element: Element): element is HTMLInputElement {
	return element.matches('input');
}

export function isTextarea(element: Element): element is HTMLTextAreaElement {
	return element.matches('textarea');
}

export function isTextfield(element: Element): element is HTMLInputElement | HTMLTextAreaElement {
	return isInput(element) || isTextarea(element);
}

export function isElement(node?: Element | EventTarget | Node | null): node is Element {
	return !!node && 'nodeType' in node && node.nodeType === Node.ELEMENT_NODE;
}

export function isHTMLElement(node: any): node is HTMLElement {
	return !!node && node instanceof node.ownerDocument.defaultView.HTMLElement;
}

export function isTextNode(node: Node): node is Text {
	return node.nodeType === Node.TEXT_NODE;
}
