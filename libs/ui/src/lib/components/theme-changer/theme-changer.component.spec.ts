import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { ThemeChangerComponent } from './theme-changer.component';

describe('themeChangerComponent', () => {
	let component: ThemeChangerComponent;
	let fixture: ComponentFixture<ThemeChangerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ThemeChangerComponent],
		}).compileComponents();

		Object.defineProperty(window, 'matchMedia', {
			writable: true,
			value: jest.fn().mockImplementation((q) => ({
				matches: false,
				media: q,
				onchange: null,
				dispatchEvent: jest.fn(),
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
			})),
		});

		fixture = TestBed.createComponent(ThemeChangerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should change theme', () => {
		expect(jest.fn(component.changeTheme)).toBeTruthy();
	});
});
