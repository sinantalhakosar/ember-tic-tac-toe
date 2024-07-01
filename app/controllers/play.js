import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class PlayRouteController extends Controller {
  @service router;
  @service game;
  @service score;

  constructor() {
    super(...arguments);
    this.game.turn = this.game.startingPlayer === 'X' ? 0 : 1;
  }

  @action
  newGameAction() {
    this.game.turn = this.game.startingPlayer === 'X' ? 0 : 1;
    this.game.reset();
  }

  @action
  closeWinDialog() {
    this.game.isWin = null;
  }

  @action
  closeDrawDialog() {
    this.game.isDraw = null;
  }

  @action
  onSquareClick(player, index) {
    this.game.board[index] = { index, value: player };

    const result = this.game.calculateResult();

    if (result === false) {
      this.game.turn = this.game.turn ? 0 : 1;
    }
  }
}
