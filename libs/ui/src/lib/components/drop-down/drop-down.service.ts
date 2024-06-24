import { Injectable, inject } from '@angular/core';
import type { DropdownOptions } from '@ui/components/drop-down/constants';
import { DROPDOWNS } from '@ui/components/drop-down/constants';
import type { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { DropdownComponent } from '@ui/components/drop-down/dropdown.component';
import { Observable } from 'rxjs';
import { IdService } from '@ui/services';

@Injectable({
	providedIn: 'root',
})
export class DropDownService {
	private readonly dropdowns = inject(DROPDOWNS);
	private readonly id = inject(IdService);

	open(content: PolymorpheusContent, options?: DropdownOptions) {
		return new Observable((observer) => {
			const component = new PolymorpheusComponent(DropdownComponent);
			const dropdown = {
				component,
				id: this.id.generate(),
				content,
				$implicit: observer,
				...options,
			};

			this.dropdowns.next([...this.dropdowns.value, dropdown as any]);
			observer.next(dropdown);
			return () => this.dropdowns.value.filter((item) => item.id !== dropdown.id);
		});
	}

	close() {
		this.dropdowns.next([]);
	}
}
