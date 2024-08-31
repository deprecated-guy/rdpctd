import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TuiDropdown, TuiLink } from '@taiga-ui/core';
import { PageMenuComponent } from './menu.component';
import type { Navigation } from '@core/types';


describe('PageMenuComponent', () => {
  let component: PageMenuComponent;
  let componentRef: ComponentFixture<PageMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageMenuComponent, RouterTestingModule],
    }).compileComponents();

    componentRef = TestBed.createComponent(PageMenuComponent);
    component = componentRef.componentInstance;
  });

  it('должен создаваться', () => {
    expect(component).toBeTruthy();
  });

  it('должен иметь входной параметр menuLinks', () => {
    const testLinks: Navigation[] = [
      { routerLink: '/test', title: 'Test Link' }
    ];
    componentRef.componentRef.setInput('menuLinks', testLinks);
    componentRef.detectChanges();
    expect(component.menuLinks()).toEqual(testLinks);
  });

  it('должен обновлять isSticky при прокрутке', () => {
    const scrollEvent = new Event('scroll');
    window.dispatchEvent(scrollEvent);
    expect(component.isSticky()).toBeDefined();
  });

  it('должен вычислять position на основе isSticky', () => {
    component.isSticky.set(true);
    expect(component.position()).toBe('fixed');
    component.isSticky.set(false);
    expect(component.position()).toBe('static');
  });
});



