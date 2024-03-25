import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
	name: 'plural',
	standalone: true,
	pure: true,
})
export class PluralPipe implements PipeTransform {
	public transform(value: any, word: string, pWord: string): string {
		return value === 1 ? `${value} ${word}` : `${value} ${pWord}`;
	}
}
