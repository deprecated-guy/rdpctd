import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
	standalone: true,
	name: 'plural',
	pure: true,
})
export class PluralPipe implements PipeTransform {
	transform(value: number, v0_more: string, v1: string): string {
		return value === 1 ? `${value} ${v1}` : `${value} ${v0_more}`;
	}
}