
import { DestroyRef, Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { DeviceService } from '@ui/services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest } from 'rxjs';
import { toObservable } from '@ui/additional';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

@Directive({
	selector: '[appDevice]',
	standalone: true,
})
export class DeviceDirective {
	private deviceService = inject(DeviceService);
	private templateRef = inject(TemplateRef<unknown>);
	private viewContainer = inject(ViewContainerRef);
	private destroyRef = inject(DestroyRef);

	private hasView = false;

	@Input() set appDevice(deviceTypes: DeviceType | DeviceType[]) {
		const types = Array.isArray(deviceTypes) ? deviceTypes : [deviceTypes];
		
		combineLatest([
			toObservable(this.deviceService.isMobileSignal),
			toObservable(this.deviceService.isTabletSignal),
		]).pipe(
			takeUntilDestroyed(this.destroyRef),
		).subscribe(([isMobile, isTablet]) => {
			const shouldRender = types.some(type => this.shouldRenderForDevice(type, isMobile, isTablet));

			if (shouldRender && !this.hasView) {
				this.viewContainer.createEmbeddedView(this.templateRef);
				this.hasView = true;
			} else if (!shouldRender && this.hasView) {
				this.viewContainer.clear();
				this.hasView = false;
			}
		});
	}

	private shouldRenderForDevice(deviceType: DeviceType, isMobile: boolean, isTablet: boolean): boolean {
		switch (deviceType) {
		case 'mobile':
				return isMobile;
			case 'tablet':
				return isTablet;
			case 'desktop':
				return !isMobile && !isTablet;
			default:
				return false;
		}
	}
}


