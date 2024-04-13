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

		fixture = TestBed.createComponent(ThemeChangerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
