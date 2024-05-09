import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('headerComponent', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HeaderComponent],
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
		fixture = TestBed.createComponent(HeaderComponent);

		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
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
		expect(component).toBeTruthy();
	});

	it('should render drawer', () => {
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
		expect(fixture.nativeElement.querySelector('app-drawer-menu') as HTMLElement).toBeTruthy();
	});

	it('should render menu', () => {
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
		expect(fixture.nativeElement.querySelector('.menu') as HTMLElement).toBeTruthy();
	});
});
