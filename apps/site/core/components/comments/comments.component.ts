import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-comments',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ``,
})
export class CommentsComponent {
  comments: { text: string; replies: string[] }[] = [];
  newComment: string = '';
  replyText: string = '';

  addComment() {
    if (this.newComment) {
      this.comments.push({ text: this.newComment, replies: [] });
      this.newComment = '';
    }
  }

  addReply(comment: { replies: string[] }) {
    if (this.replyText) {
      comment.replies.push(this.replyText);
      this.replyText = '';
    }
  }

  onCommentChange(value: string) {
    this.newComment = value;
  }

  onReplyChange(value: string) {
    this.replyText = value;
  }
}