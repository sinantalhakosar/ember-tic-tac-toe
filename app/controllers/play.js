import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class PlayRouteController extends Controller {
  @tracked turn = 0;
  board = Array(9).fill(null);

  @action
  onChangeTurnClick() {
    this.turn = this.turn ? 0 : 1;
  }

  @action
  onSquareClick(player, index) {
    this.board[index] = player;
    this.turn = this.turn ? 0 : 1;
  }
}
