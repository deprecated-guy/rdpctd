import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
	name: 'precision',
	standalone: true,
	pure: true,
})
export class PrecisionPipe implements PipeTransform {
	transform(value: number | string | undefined, precision: number): string {
		return value ? Number(value).toFixed(precision) : '';
	}
}

@Pipe({
	name: 'decimal',
	standalone: true,
	pure: true,
})
export class DecimalPipe implements PipeTransform {
	transform(value: number | string | undefined): string {
		return value ? Number(value).toFixed(2).toLocaleString().replace('.', ',') : '';
	}
}
