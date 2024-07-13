import { Injectable, inject } from '@angular/core';
import type { RouterStateSnapshot } from '@angular/router';
import { TitleStrategy } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Injectable()
export class AppTitleStrategy extends TitleStrategy {
	private readonly titleService = inject(Title);

	override updateTitle(snapshot: RouterStateSnapshot): void {
		const title = this.buildTitle(snapshot);

		if (!title)
			this.titleService.setTitle('rdpctd.dev');
		else this.titleService.setTitle(`rdpctd.dev - ${title}`);
	}
}