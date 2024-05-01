import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
	name: 'plural',
	standalone: true,
	pure: true,
})
export class PluralPipe implements PipeTransform {
	public transform(value: number, word: string, pluralWord: string): string {
		if (value === 1 || value === 3) return `${value} ${word}`;
		else return `${value} ${pluralWord}`;
	}
}
