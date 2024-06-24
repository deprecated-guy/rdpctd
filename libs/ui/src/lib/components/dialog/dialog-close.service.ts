import { ElementRef, Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { containsOrAfter } from '@ui/additional/contains-or-after';
import { WINDOW } from '@ng-web-apis/common';
import { DOCUMENT } from '@angular/common';
import { isElement } from '@ui/additional/element-checks';

@Injectable({ providedIn: null })
export class DialogCloseService extends Observable<boolean> {
	private readonly win = inject(WINDOW);
	private readonly doc = inject(DOCUMENT);
	private readonly el = inject(ElementRef).nativeElement;

	private isOutside(target: EventTarget): boolean {
		return (
			isElement(target) &&
			(!containsOrAfter(this.el, target) || target === this.el)
		);
	}
}