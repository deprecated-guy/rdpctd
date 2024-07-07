import { Directive, ElementRef, HostListener, RendererFactory2, inject, input } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
	selector: '[scrollSpy]',
	standalone: true,
})
export class ScrollSpyDirective {
	private readonly doc = inject(DOCUMENT);
	private readonly element = inject(ElementRef).nativeElement;
	private readonly renderer = inject(RendererFactory2).createRenderer(this.element, null);

	readonly spyElementName = input<string | null>(null);

	private get coloringElements(): HTMLElement[] {
		return Array.from(this.doc.querySelectorAll('.color-link'));
	}

	private get spyElements(): HTMLAnchorElement[] {
		return Array.from(this.element.querySelectorAll(this.spyElementName() ?? ''));
	}

	@HostListener('document:scroll', ['$event'])
	onScroll() {
		const window = this.doc.defaultView;
		const scrollY = window!.scrollY;

		this.spyElements.forEach(spyEl => {
			this.coloringElements?.forEach(coloringEl => {
				if (scrollY > spyEl.scrollTop && (coloringEl as HTMLAnchorElement).href.includes(spyEl.id))
					this.renderer.addClass(coloringEl, 'highlighted');

				else
					this.renderer.removeClass(coloringEl, 'highlighted');
			});
		});
	}
}