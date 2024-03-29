import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DestroyService extends ReplaySubject<void> {
	constructor() {
		super(1);
	}

	ngOnDestroy() {
		this.next();
		this.complete();
	}
}
