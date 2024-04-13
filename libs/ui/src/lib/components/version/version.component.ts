import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-version',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './version.component.html',
	styleUrl: './version.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VersionComponent {
	private readonly httpClient = inject(HttpClient);
	version = this.httpClient.get('assets/version.txt', { responseType: 'text' });
}
