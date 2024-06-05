import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class CommonToastComponent extends Component {
  @service toast;

  get messages() {
    return this.toast.messages;
  }

  removeMessage = (id) => {
    this.toast.removeMessage(id);
  };
}
