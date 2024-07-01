import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class GameService extends Service {
  boardSize = 9;
  @tracked board = Array.from({ length: this.boardSize }, (_, index) => ({
    index,
    value: null,
  }));

  @tracked startingPlayer = 'X';
  @tracked turn = 0;
  @tracked winIndexes = [null, null, null];

  @tracked isWin = false;
  @tracked isDraw = false;

  @service score;

  reset() {
    this.board = Array.from({ length: this.boardSize }, (_, index) => ({
      index,
      value: null,
    }));

    this.winIndexes = [null, null, null];
    this.isWin = false;
    this.isDraw = false;
  }

  // call this function after calculating each winning cases
  checkDraw() {
    this.isDraw = this.board.every((square) => square.value !== null);
    return this.isDraw;
  }

  calculateHorizontalWin() {
    let win = [null, null, null];
    let player = null;
    const sqrt = Math.sqrt(this.boardSize);

    for (let i = 0; i < sqrt; i++) {
      const rowStart = i * sqrt;

      player = this.board[rowStart].value;
      if (player === null) continue;

      win = [rowStart, null, null];

      for (let j = 1; j < sqrt; j++) {
        win[j] = rowStart + j;

        if (this.board[rowStart + j].value !== player) {
          win[j] = null;
          break;
        }
      }

      if (win.every((idx) => idx !== null)) {
        this.winCallback(player, win);
        return true;
      }
    }

    return false;
  }

  calculateVerticalWin() {
    let win = [null, null, null];
    let player = null;
    const sqrt = Math.sqrt(this.boardSize);

    for (let i = 0; i < sqrt; i++) {
      player = this.board[i].value;
      if (player === null) continue;

      win = [i, null, null];

      for (let j = 1; j < sqrt; j++) {
        win[j] = i + j * sqrt;

        if (this.board[i + j * sqrt].value !== player) {
          win[j] = null;
          break;
        }
      }

      if (win.every((idx) => idx !== null)) {
        this.winCallback(player, win);
        return true;
      }
    }

    return false;
  }

  calculateDiagonalWin() {
    let win = [null, null, null];
    let player = this.board[0].value;
    const sqrt = Math.sqrt(this.boardSize);

    if (player !== null) {
      win[0] = 0;

      for (let i = 1; i < sqrt; i++) {
        win[i] = i * (sqrt + 1);

        if (this.board[i * (sqrt + 1)].value !== player) {
          win[i] = null;
          break;
        }
      }

      if (win.every((idx) => idx !== null)) {
        this.winCallback(player, win);
        return true;
      }
    }

    win = [null, null, null];
    player = this.board[sqrt - 1].value;

    if (player !== null) {
      win[0] = sqrt - 1;

      for (let i = 1; i < sqrt; i++) {
        win[i] = (i + 1) * sqrt - i - 1;

        if (this.board[(i + 1) * sqrt - i - 1].value !== player) {
          win[i] = null;
          break;
        }
      }

      if (win.every((idx) => idx !== null)) {
        this.winCallback(player, win);
        return true;
      }
    }

    return false;
  }

  winCallback(player, indexes) {
    this.winIndexes = indexes;
    this.score.updateScores(player);
    this.isWin = true;
  }

  calculateResult() {
    let result = this.calculateHorizontalWin();
    if (result === false) {
      result = this.calculateVerticalWin();
      if (result === false) {
        result = this.calculateDiagonalWin();
      }
    }

    if (result === false) {
      // no win
      result = this.checkDraw();
    }

    return result;
  }
}
