import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';
import { IconComponent } from '@ui/components';

@Component({
	selector: 'app-install-button',
	templateUrl: './install-button.component.html',
	styleUrls: ['./install-button.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [IconComponent],
	standalone: true,
	host: {
		'(click)': 'installApp()',
	},
})
export class InstallButtonComponent {
	protected deferredPrompt = signal<any>(null);

	@HostListener('window:beforeinstallprompt', ['$event'])
	handleBeforeInstallPrompt(e: any) {
		e.preventDefault();
		this.deferredPrompt.set(e);
	}

	installApp() {
    	if (this.deferredPrompt()) {
    		this.deferredPrompt().prompt();
    		this.deferredPrompt().userChoice.then((choiceResult: any) => {
    			if (choiceResult.outcome === 'accepted')
    				console.log('User accepted the install prompt');
    			else
    				console.log('User dismissed the install prompt');

    			this.deferredPrompt.set(null); // Reset deferred prompt
    		});
    	}
	}
}
