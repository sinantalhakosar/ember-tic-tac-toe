import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ToastService extends Service {
  @tracked messages = [];

  addMessage(type, text) {
    let id = Date.now();
    this.messages = [...this.messages, { id, type, text }];

    // Automatically remove the toast after 3 seconds
    setTimeout(() => {
      this.removeMessage(id);
    }, 3000);
  }

  @action
  removeMessage(id) {
    this.messages = this.messages.filter((message) => message.id !== id);
  }

  success(text) {
    this.addMessage('success', text);
  }

  error(text) {
    this.addMessage('error', text);
  }

  info(text) {
    this.addMessage('info', text);
  }

  warning(text) {
    this.addMessage('warning', text);
  }
}
