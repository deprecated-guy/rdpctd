export function containsOrAfter(current: Node, node: Node) {
	try {
		return current.contains(node) || !!(node.compareDocumentPosition(current) & Node.DOCUMENT_POSITION_PRECEDING);
	} catch {
		return false;
	}
}
