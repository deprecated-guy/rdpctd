import { Directive, ElementRef, RendererFactory2, inject, input } from '@angular/core';
import { computePosition } from '@floating-ui/dom';

@Directive({
	selector: '[appCenterize]',
	standalone: true,
})
export class CenterizeElementDirective {
	private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
	private readonly renderer = inject(RendererFactory2).createRenderer(this.element, null);

	readonly centerizeElement = input.required<string>();

	get centrizeElement(): HTMLElement | null {
		return this.element.querySelector(this.centerizeElement());
	}

	ngOnInit() {
		if (this.centrizeElement) {
			computePosition(this.element, this.centrizeElement).then(({ x }) => {
				if (this.centrizeElement) {
					this.renderer.setStyle(this.centrizeElement, 'left', `${x / 16}rem`);
					this.renderer.setStyle(this.centrizeElement, 'right', `${x / 16}rem`);
				}
			});
		}
	}
}
