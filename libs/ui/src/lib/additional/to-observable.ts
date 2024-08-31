import { Signal } from '@angular/core';
import { Observable } from 'rxjs';

export function toObservable<T>(value: Signal<T>): Observable<T> {
	return new Observable<T>(observer => {
		observer.next(value());
		
		return () => {
			value()
		};
	});
}



