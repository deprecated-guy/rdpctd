import { Injectable, PLATFORM_ID, computed, inject } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

import * as Prism from 'prismjs';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-ruby';

@Injectable({
	providedIn: 'root',
})
export class HighlightService {
	private readonly platformId = inject(PLATFORM_ID);
	private readonly isBrowser = computed(() => isPlatformBrowser(this.platformId));

	highlight() {
		if (this.isBrowser()) Prism.highlightAll();
	}
}
