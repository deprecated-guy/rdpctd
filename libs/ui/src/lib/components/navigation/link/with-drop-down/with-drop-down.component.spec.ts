import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { WithDropDownComponent } from '@ui/components';

describe('withDropDownComponent', () => {
	let component: WithDropDownComponent;
	let fixture: ComponentFixture<WithDropDownComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [WithDropDownComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(WithDropDownComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should open drop down', () => {
		component.dropdownOpened = true;

		expect(fixture.nativeElement.querySelector('.dropdown')).not.toBeNull();
	});

	it('should hide dropdown', () => {
		component.dropdownOpened = false;

		expect(fixture.nativeElement.querySelector('.dropdown')).toBeNull();
	});

	it('dropdown can not e null', () => {
		expect(component.dropdown()).not.toBeNull();
	});

	it('icon can not e null', () => {
		expect(component.icon()).not.toBeNull();
	});
});
