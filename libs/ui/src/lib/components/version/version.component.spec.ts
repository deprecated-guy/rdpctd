import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { VersionComponent } from './version.component';

describe('versionComponent', () => {
	let component: VersionComponent;
	let fixture: ComponentFixture<VersionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [VersionComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(VersionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
