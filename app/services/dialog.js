import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class DialogService extends Service {
  @tracked dialogs = {};

  openDialog(dialogKey) {
    this.dialogs = { ...this.dialogs, [dialogKey]: true };
  }

  closeDialog(dialogKey) {
    this.dialogs = { ...this.dialogs, [dialogKey]: false };
  }

  cancelDialog(dialogKey) {
    this.dialogs = { ...this.dialogs, [dialogKey]: null };
  }

  isDialogOpen(dialogKey) {
    return !!this.dialogs[dialogKey];
  }

  isDialogCancelled(dialogKey) {
    return this.dialogs[dialogKey] === null;
  }
}
