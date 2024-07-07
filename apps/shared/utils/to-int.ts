export function toInt(value: string | number): number;
export function toInt<D>(value: string | number | undefined | null, defaultValue: D): number | D;
export function toInt<D>(value: string | number | undefined | null, defaultValue?: number | D): number | D {
	if (
		typeof defaultValue !== 'undefined'
		&& (
			value === null ||
			typeof value === 'undefined' ||

			(
				typeof value === 'string'
				&& value.trim() === ''
			)
		)
	)
		return defaultValue;

	if (value === null || typeof value === 'undefined')
		throw new Error(`Typerror: type ${typeof value} is not consistent`);

	return Number.parseInt(value.toString(), 10);
}