import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { HeaderService } from './header.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TuiExpandModule } from '@taiga-ui/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { PluralPipe } from '@ui/pipes';
import { DrawerMenuComponent, IconComponent, LinkComponent } from '@ui/components';
import { HeaderItemComponent } from './item/header-item.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let headerService: HeaderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        RouterTestingModule,
        TuiExpandModule,
        AsyncPipe,
        CommonModule,
        PluralPipe,
        IconComponent,
        DrawerMenuComponent,
        LinkComponent,
        HeaderItemComponent
      ],
      providers: [HeaderService]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    headerService = TestBed.inject(HeaderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle expanded state', () => {
    expect(component.expanded()).toBeFalsy();
    component.openExpand();
    expect(component.expanded()).toBeTruthy();
    component.openExpand();
    expect(component.expanded()).toBeFalsy();
  });

  it('should toggle theme', () => {
    expect(component.theme()).toBe('light');
    component.toggleTheme();
    expect(component.theme()).toBe('dark');
    component.toggleTheme();
    expect(component.theme()).toBe('light');
  });

  it('should emit theme change', () => {
    const themeChangeSpy = jest.spyOn(component.themeChange, 'emit');
    component.toggleTheme();
    expect(themeChangeSpy).toHaveBeenCalledWith('dark');
  });

  it('should check if theme is dark', () => {
    expect(component.isDarkTheme()).toBeFalsy();
    component.toggleTheme();
    expect(component.isDarkTheme()).toBeTruthy();
  });

  it('should have a counter that updates over time', (done) => {
    const initialValue = component.counter();
    setTimeout(() => {
      expect(component.counter()).not.toBe(initialValue);
      done();
    }, 1100);
  });

  it('должны быть элементы навигации', () => {
    expect(headerService.navigation()).toBeDefined();
    expect(Array.isArray(headerService.navigation())).toBe(true);
  });
});
