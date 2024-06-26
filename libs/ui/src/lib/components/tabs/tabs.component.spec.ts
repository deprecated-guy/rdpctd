import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { TabsComponent } from './tabs.component';

describe('tabsComponent', () => {
	let component: TabsComponent;
	let fixture: ComponentFixture<TabsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TabsComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TabsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
