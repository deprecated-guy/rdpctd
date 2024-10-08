import type { ApplicationConfig } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { TitleStrategy, provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideMarkdown } from 'ngx-markdown';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { AppTitleStrategy } from '@shared/services/app-title.strategy';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(appRoutes),
		provideMarkdown({ loader: HttpClient }),
		provideHttpClient(),
		provideAnimations(),
		{
			provide: TitleStrategy,
			useClass: AppTitleStrategy,
		},
	],
};
