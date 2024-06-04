import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class PlaySquareComponent extends Component {
  @tracked value = this.args.initialValue;

  @action
  handleClick() {
    if (this.value !== null) {
      window.alert('This square is already taken');
      return;
    }

    const player = this.args.turn ? 'O' : 'X';
    this.value = player;
    this.args.onClick(player, this.args.index);
  }
}
