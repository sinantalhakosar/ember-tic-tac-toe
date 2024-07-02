import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class PlayWithAiController extends Controller {
  @service router;
  @service game;
  @service score;
  @service openaiBot;

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
  async onSquareClick(player, index) {
    let result = false;
    this.game.board[index] = { index, value: player };

    result = this.game.calculateResult();

    if (result === false) {
      this.openaiBot.loading = true;

      this.game.turn = this.game.turn ? 0 : 1;

      const data = await this.openaiBot.getBotMove(this.game.board);

      this.game.board = this.game.board.map((square, i) => {
        if (i === data.index) {
          const otherKey = Object.keys(data).filter(
            (key) => key !== 'index',
          )[0];

          return { index: i, value: data[otherKey] };
        }

        return square;
      });

      result = this.game.calculateResult();

      if (result === false) {
        this.game.turn = this.game.turn ? 0 : 1;
      }

      this.openaiBot.loading = false;
    }
  }
}
