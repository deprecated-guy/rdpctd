import { Component, OnInit, ChangeDetectionStrategy, Host, signal } from '@angular/core';
import { IconComponent } from '@ui/components'; // Import the IconComponent if used for icons

@Component({
  selector: 'app-install-button',
  templateUrl: './install-button.component.html', 
  styleUrls: ['./install-button.component.scss'], 
  changeDetection: ChangeDetectionStrategy.OnPush, 
  imports: [IconComponent],
  standalone: true,
  host: {
    '(window:beforeinstallprompt)': 'handleBeforeInstallPrompt($event)', // Handle the beforeinstallprompt event
  }
})
export class InstallButtonComponent {
  protected deferredPrompt = signal<any>(null);

  handleBeforeInstallPrompt(e: any) {
    e.preventDefault();
    this.deferredPrompt.set(e); 
  }

  installApp() {
    if (this.deferredPrompt()) {
      this.deferredPrompt().prompt();
      this.deferredPrompt().userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt.set(null); // Reset deferred prompt
      });
    }
  }
}