import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstallButtonComponent } from './install-button.component';

describe('InstallButtonComponent', () => {
  let component: InstallButtonComponent;
  let fixture: ComponentFixture<InstallButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstallButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if the device is mobile', () => {
    component.checkMobile();
    expect(component.isMobile).toBeDefined();
  });

  it('should handle beforeinstallprompt event', () => {
    const event = new Event('beforeinstallprompt');
    component.handleBeforeInstallPrompt(event);
    expect(component.deferredPrompt).toBe(event);
  });

  it('should install the app when installApp is called', async () => {
    const promptSpy = jasmine.createSpy('prompt');
    const userChoiceSpy = jasmine.createSpy('userChoice').and.returnValue(Promise.resolve({ outcome: 'accepted' }));
    component.deferredPrompt = { prompt: promptSpy, userChoice: userChoiceSpy };

    await component.installApp();
    expect(promptSpy).toHaveBeenCalled();
    expect(userChoiceSpy).toHaveBeenCalled();
  });
});