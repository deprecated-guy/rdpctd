import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateAlertsComponent, ChangelogMessageComponent } from './update-alert.component';
import { TuiAlertService } from '@taiga-ui/core';
import { RouterTestingModule } from '@angular/router/testing';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

describe('UpdateAlertsComponent', () => {
  let component: UpdateAlertsComponent;
  let fixture: ComponentFixture<UpdateAlertsComponent>;
  let alertServiceSpy: jest.Mocked<TuiAlertService>;

  beforeEach(async () => {
    alertServiceSpy = {
      open: jest.fn()
    } as unknown as jest.Mocked<TuiAlertService>;

    await TestBed.configureTestingModule({
      imports: [UpdateAlertsComponent, RouterTestingModule],
      providers: [
        { provide: TuiAlertService, useValue: alertServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateAlertsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize worker if Worker is available', () => {
    const initializeWorkerSpy = jest.spyOn(component as any, 'initializeWorker');
    component.ngOnInit();
    expect(initializeWorkerSpy).toHaveBeenCalled();
  });

  it('should not initialize worker if Worker is not available', () => {
    const initializeWorkerSpy = jest.spyOn(component as any, 'initializeWorker');
    (window as any).Worker = undefined;
    component.ngOnInit();
    expect(initializeWorkerSpy).not.toHaveBeenCalled();
  });

  it('should terminate worker on destroy', () => {
    const terminateWorkerSpy = jest.spyOn(component as any, 'terminateWorker');
    component.ngOnDestroy();
    expect(terminateWorkerSpy).toHaveBeenCalled();
  });

  it('should show alert when version changes', () => {
    const mockEvent = { data: { type: 'VERSION_CHANGE', version: '1.0.1' } };
    (component as any).handleWorkerMessage(mockEvent);
    expect(alertServiceSpy.open).toHaveBeenCalledWith(
      expect.any(PolymorpheusComponent),
      {
        label: 'Обновление',
        autoClose: 5000,
        closeable: true,
      }
    );
  });
});

describe('ChangelogMessageComponent', () => {
  let component: ChangelogMessageComponent;
  let fixture: ComponentFixture<ChangelogMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangelogMessageComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangelogMessageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct message', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Доступно новое обновление.');
    expect(compiled.textContent).toContain('Проверьте список изменений');
  });

  it('should have a link to changelog', () => {
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('a');
    expect(link).toBeTruthy();
    expect(link.getAttribute('routerLink')).toBe('/changelog');
  });
});

