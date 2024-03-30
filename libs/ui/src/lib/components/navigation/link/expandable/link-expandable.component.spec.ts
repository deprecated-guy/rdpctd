import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { LinkExpandableComponent } from './link-expandable.component';

describe('linkExpandableComponent', () => {
	let component: LinkExpandableComponent;
	let fixture: ComponentFixture<LinkExpandableComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [LinkExpandableComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(LinkExpandableComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
