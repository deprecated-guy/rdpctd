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
});
