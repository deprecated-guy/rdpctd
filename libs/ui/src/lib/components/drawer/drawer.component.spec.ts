import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { DrawerComponent } from './drawer.component';

describe('drawerComponent', () => {
	let component: DrawerComponent;
	let fixture: ComponentFixture<DrawerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DrawerComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(DrawerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
