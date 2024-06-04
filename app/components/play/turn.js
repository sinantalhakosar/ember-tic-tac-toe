import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class TurnTurnComponent extends Component {
  get info() {
    const turnText = this.args.turn === 0 ? 'X' : 'O';
    return `Turn: ${turnText}`;
  }

  @action handleTurnClick() {
    this.args.onClick();
  }
}
