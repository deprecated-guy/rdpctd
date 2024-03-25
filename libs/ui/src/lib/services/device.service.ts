import { Injectable } from '@angular/core';
import { distinctUntilChanged, fromEvent, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

export interface Breacpoint {
	mobile: {
		min: number;
		max: number;
	};
	desktop: {
		min: number;
		max: number;
	};
	tab: {
		min: number;
		max: number;
	};
}

@Injectable({ providedIn: 'root' })
export class DeviceService {
	private readonly devices: Breacpoint = {
		mobile: {
			min: Number.NEGATIVE_INFINITY,
			max: 780,
		},
		tab: {
			min: 780,
			max: 1220,
		},
		desktop: {
			min: 1220,
			max: Number.POSITIVE_INFINITY,
		},
	};

	private resieEvent = fromEvent(window, 'resize');

	width = toSignal(
		this.resieEvent.pipe(
			map(() => this.getWidth()),
			distinctUntilChanged(),
		),
		{
			initialValue: this.getWidth(),
		},
	);

	height = toSignal(
		this.resieEvent.pipe(
			map(() => this.getHeight()),
			distinctUntilChanged(),
		),
		{
			initialValue: this.getHeight(),
		},
	);

	private getWidth() {
		return window.innerWidth ? window.innerWidth : window.outerWidth;
	}

	private getHeight() {
		return window.innerHeight ? window.innerHeight : window.outerHeight;
	}

	private isTab() {
		return (
			(window.innerWidth > this.devices.tab.min && window.innerWidth < this.devices.tab.max) ||
			(window.outerWidth > this.devices.tab.min && window.outerWidth < this.devices.tab.max)
		);
	}

	private isDesk() {
		return (
			(window.innerWidth > this.devices.desktop.min && window.innerWidth < this.devices.desktop.max) ||
			(window.outerWidth > this.devices.desktop.min && window.outerWidth < this.devices.desktop.max)
		);
	}

	private isMobile() {
		return (
			(window.innerWidth > this.devices.mobile.min && window.innerWidth < this.devices.mobile.max) ||
			(window.outerWidth > this.devices.mobile.min && window.outerWidth < this.devices.mobile.max)
		);
	}
}
