import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { action, set } from '@ember/object';

export default class PlayWithAiController extends Controller {
  boardSize = 9;
  @tracked board = Array.from({ length: this.boardSize }, (_, index) => ({
    index,
    value: null,
  }));

  @tracked turn = 0;
  @tracked winIndexes = [null, null, null];
  @tracked isWinDialogOpen = false;
  @tracked isDrawDialogOpen = false;
  @tracked scores = { X: 0, O: 0 };
  @tracked loading = false;
  @tracked playWithAIEnabled = false;

  @service router;
  @service openaiBot;
  @service openAiEnabled;

  constructor() {
    super(...arguments);
    this._initScoresFromLocalStorage();

    let firstPlayingPlayer = localStorage.getItem('firstPlayingPlayer');
    if (!firstPlayingPlayer) {
      firstPlayingPlayer = 'X';
      localStorage.setItem('firstPlayingPlayer', firstPlayingPlayer);
    }

    this.turn = firstPlayingPlayer === 'X' ? 0 : 1;
    this.playWithAIEnabled = this.openAiEnabled.isAIEnabled();
  }

  _initScoresFromLocalStorage() {
    const scores = localStorage.getItem('scores');

    if (scores) {
      this.scores = JSON.parse(scores);
    }
  }

  reset() {
    this.turn = 0;
    this.board = Array.from({ length: this.boardSize }, (_, index) => ({
      index,
      value: null,
    }));

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
    let result = false;
    let winningPlayer = null;

    const horizontal = this.calculateHorizontalWin();
    const vertical = this.calculateVerticalWin();
    const diagonal = this.calculateDiagonalWin();

    if (horizontal.result) {
      result = horizontal.result;
      this.winIndexes = horizontal.indexes;
      winningPlayer = horizontal.player;
    }

    if (vertical.result) {
      result = vertical.result;
      this.winIndexes = vertical.indexes;
      winningPlayer = vertical.player;
    }

    if (diagonal.result) {
      result = diagonal.result;
      this.winIndexes = diagonal.indexes;
      winningPlayer = diagonal.player;
    }

    if (result) {
      this._updateScores(winningPlayer);
      this.isWinDialogOpen = true;
      return true;
    }

    if (this.board.every((square) => square.value !== null)) {
      this.isDrawDialogOpen = true;
      return false;
    }

    return false;
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

      if (win.every((idx) => idx !== null))
        return { result: true, indexes: win, player };
    }

    return { result: false, indexes: [null, null, null], player: null };
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

      if (win.every((idx) => idx !== null))
        return { result: true, indexes: win, player };
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
  async onSquareClick(player, index) {
    let isWin = false;
    this.board[index] = { index, value: player };

    isWin = this.calculateWin();

    if (isWin === false) {
      this.turn = this.turn ? 0 : 1;

      this.loading = true;
      const data = await this.openaiBot.getBotMove(this.board);

      this.board = this.board.map((square, i) => {
        if (i === data.index) {
          const otherKey = Object.keys(data).filter(
            (key) => key !== 'index',
          )[0];

          return { index: i, value: data[otherKey] };
        }

        return square;
      });

      isWin = this.calculateWin();

      this.loading = false;

      if (isWin === false) {
        this.turn = this.turn ? 0 : 1;
      }
    }
  }
}
