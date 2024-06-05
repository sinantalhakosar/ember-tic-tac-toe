import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class PlaySquareComponent extends Component {
  @tracked value = this.args.initialValue;
  @tracked isHovered = false;

  @service toast;

  @action
  handleMouseOver() {
    this.isHovered = true;
  }

  @action
  handleMouseOut() {
    this.isHovered = false;
  }

  @action
  handleClick() {
    if (this.args.disabled) {
      this.toast.error('This game is already over.');
      return;
    }

    if (this.value !== null) {
      this.toast.warning('This square is already taken!');
      return;
    }

    const player = this.args.turn ? 'O' : 'X';
    this.value = player;
    this.args.onClick(player, this.args.index);
  }
}
