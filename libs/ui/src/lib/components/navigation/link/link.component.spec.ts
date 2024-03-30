import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { LinkComponent } from './link.component';

describe('linkComponent', () => {
	let component: LinkComponent;
	let fixture: ComponentFixture<LinkComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [LinkComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(LinkComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
