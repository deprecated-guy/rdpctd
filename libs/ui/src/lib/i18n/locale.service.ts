import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  private readonly currentLocaleSubject: BehaviorSubject<string> = new BehaviorSubject<string>('en');
  private readonly translations = signal<{ [key: string]: { [lang: string]: string } }>({});
  private readonly http = inject(HttpClient);

   translate(locale: string) {
    const enTranslations = this.http.get<{ [key: string]: string }>('assets/translations/translations.en.json');
    const ruTranslations = this.http.get<{ [key: string]: string }>('assets/translations/translations.ru.json');

    return forkJoin([enTranslations, ruTranslations]).pipe(
        tap(([en, ru]) => {
            this.translations.set({
                en: en,
                ru: ru
            });
        }),
        switchMap(() => {
            this.currentLocaleSubject.next(locale);
            return of(locale).pipe(map((key) => this.translations[key]?.[locale] || key));
        })
    );
  }

}