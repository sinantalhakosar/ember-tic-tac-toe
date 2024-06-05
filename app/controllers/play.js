import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { action, set } from '@ember/object';

export default class PlayRouteController extends Controller {
  boardSize = 9;
  board = Array(this.boardSize).fill(null);

  @tracked turn = 0;
  @tracked winIndexes = [null, null, null];
  @tracked isWinDialogOpen = false;
  @tracked isDrawDialogOpen = false;
  @tracked scores = { X: 0, O: 0 };

  @service router;

  constructor() {
    super(...arguments);
    this._initScoresFromLocalStorage();
  }

  _initScoresFromLocalStorage() {
    const scores = localStorage.getItem('scores');

    if (scores) {
      this.scores = JSON.parse(scores);
    }
  }

  reset() {
    this.turn = 0;
    this.board = Array(9).fill(null);
    this.winIndexes = [null, null, null];
    this.isWinDialogOpen = false;
  }

  _saveScoresToLocalStorage() {
    localStorage.setItem('scores', JSON.stringify(this.scores));
  }

  _updateScores(winner) {
    set(this.scores, winner, this.scores[winner] + 1);
    this._saveScoresToLocalStorage();
  }

  calculateWin() {
    const horizontal = this.calculateHorizontalWin();
    const vertical = this.calculateVerticalWin();
    const diagonal = this.calculateDiagonalWin();

    if (horizontal.result) {
      return horizontal;
    }

    if (vertical.result) {
      return vertical;
    }

    if (diagonal.result) {
      return diagonal;
    }

    return { result: false };
  }

  calculateHorizontalWin() {
    let win = [null, null, null];
    let player = null;
    const sqrt = Math.sqrt(this.boardSize);

    for (let i = 0; i < sqrt; i++) {
      const rowStart = i * sqrt;
      player = this.board[rowStart];
      if (player === null) continue;
      win = [rowStart, null, null];
      for (let j = 1; j < sqrt; j++) {
        win[j] = rowStart + j;
        if (this.board[rowStart + j] !== player) {
          win[j] = null;
          break;
        }
      }
      if (win.every((idx) => idx !== null))
        return { result: true, indexes: win, player };
    }
    return { result: false, indexes: [null, null, null], player: null };
  }

  calculateVerticalWin() {
    let win = [null, null, null];
    let player = null;
    const sqrt = Math.sqrt(this.boardSize);

    for (let i = 0; i < sqrt; i++) {
      player = this.board[i];
      if (player === null) continue;
      win = [i, null, null];
      for (let j = 1; j < sqrt; j++) {
        win[j] = i + j * sqrt;
        if (this.board[i + j * sqrt] !== player) {
          win[j] = null;
          break;
        }
      }
      if (win.every((idx) => idx !== null))
        return { result: true, indexes: win, player };
    }
    return { result: false, indexes: [null, null, null], player: null };
  }

  calculateDiagonalWin() {
    let win = [null, null, null];
    let player = this.board[0];
    const sqrt = Math.sqrt(this.boardSize);

    if (player !== null) {
      win[0] = 0;
      for (let i = 1; i < sqrt; i++) {
        win[i] = i * (sqrt + 1);
        if (this.board[i * (sqrt + 1)] !== player) {
          win[i] = null;
          break;
        }
      }
      if (win.every((idx) => idx !== null))
        return { result: true, indexes: win, player };
    }

    win = [null, null, null];
    player = this.board[sqrt - 1];
    if (player !== null) {
      win[0] = sqrt - 1;
      for (let i = 1; i < sqrt; i++) {
        win[i] = (i + 1) * sqrt - i - 1;
        if (this.board[(i + 1) * sqrt - i - 1] !== player) {
          win[i] = null;
          break;
        }
      }
      if (win.every((idx) => idx !== null))
        return { result: true, indexes: win, player };
    }
    return { result: false, indexes: [null, null, null], player: null };
  }

  @action
  newGameAction() {
    this.reset();
    window.location.reload();
  }

  @action
  closeWinDialog() {
    this.isWinDialogOpen = null;
  }

  @action
  closeDrawDialog() {
    this.isDrawDialogOpen = null;
  }

  @action
  onSquareClick(player, index) {
    this.board[index] = player;

    const { result, indexes, player: winningPlayer } = this.calculateWin();

    if (result) {
      this._updateScores(winningPlayer);
      this.winIndexes = indexes;
      this.isWinDialogOpen = true;
      return;
    }

    if (this.board.every((square) => square !== null)) {
      this.isDrawDialogOpen = true;
      return;
    }

    this.turn = this.turn ? 0 : 1;
  }
}
