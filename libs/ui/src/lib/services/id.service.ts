import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class IdService {
	generate() {
		return Math.random() * 999;
	}
}
