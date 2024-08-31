import { Component, signal } from '@angular/core';
import { TuiEditorModule } from '@taiga-ui/addon-editor';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-comments',
	standalone: true,
	imports: [TuiEditorModule, FormsModule],
	template: '<tui-editor [(ngModel)]="editorContent()"></tui-editor>',
})
export class CommentsComponent {
	readonly editorContent = signal('');
}
