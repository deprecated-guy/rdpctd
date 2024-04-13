import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecimalPipe, PrecisionPipe } from '@ui/pipes';

const currencies = {
	DOLLAR: '\u{0024}',
	'0A2': '\u00A2',
	CENT: '\u00A2',
	EURO: '',
	A02: '\u0A02',
	POUND: '\u00A3',
	'0A4': '\u00A4',
	YEN: '\u00A5',
	'0192': '\u0192',
	RUPEE: '&#8377',
	DRAM: '֏',
	AFGANY: '\u060B',
	'60B': '؋',
	'09F2': '\u09F2',
	BRNGALI: '\u09F2',
	'09F3': '\u09F3',
	'0AF1': '\u0AF1',
	'0BF9': '\u0BF9',
	'0E3F': '\u0E3F',
	'07FF': '߿؋',
	'9F2': '߿',
	'9F3': '৳',
	RUB: '\u20BD',
	'020': '\u20BD',
	'17DB': '\u17DB',
	'2133': '\u2133',
	'5143': '\u5143',
};

type Currency = keyof typeof currencies;

type Decimal = 'always' | 'off';

@Component({
	selector: 'app-precision',
	standalone: true,
	imports: [CommonModule, PrecisionPipe, DecimalPipe],
	templateUrl: './number-precision.component.html',
	styleUrl: './number-precision.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberPrecisionComponent {
	value = input<number>(0);
	currency = input<Currency>();
	currencySign = computed(() => (this.currency() ? currencies[this.currency()!] : ''));
	decimal = input<Decimal>();
	precision = input<number>(2);
}
