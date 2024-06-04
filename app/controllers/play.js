import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class PlayRouteController extends Controller {
  @tracked turn = 0;
  boardSize = 9;
  board = Array(this.boardSize).fill(null);

  @action
  onChangeTurnClick() {
    this.turn = this.turn ? 0 : 1;
  }

  @action
  onSquareClick(player, index) {
    this.board[index] = player;

    const { win, player: winningPlayer } = this.calculateWin();

    if (win) {
      window.alert(`${winningPlayer} Wins!`);
      return;
    }

    this.turn = this.turn ? 0 : 1;
  }

  @action
  calculateWin() {
    const horizontal = this.calculateHorizontalWin();
    const vertical = this.calculateVerticalWin();
    const diagonal = this.calculateDiagonalWin();

    if (horizontal.win) {
      return { win: true, player: horizontal.player };
    }

    if (vertical.win) {
      return { win: true, player: vertical.player };
    }

    if (diagonal.win) {
      return { win: true, player: diagonal.player };
    }

    return { win: false };
  }

  @action
  calculateHorizontalWin() {
    let win = false;
    let player = null;
    const sqrt = Math.sqrt(this.boardSize);

    for (let i = 0; i < sqrt; i++) {
      const rowStart = i * sqrt;
      player = this.board[rowStart];
      if (player === null) continue;
      win = true;
      for (let j = 1; j < sqrt; j++) {
        if (this.board[rowStart + j] !== player) {
          win = false;
          break;
        }
      }
      if (win) return { win, player };
    }
    return { win, player: null };
  }

  @action
  calculateVerticalWin() {
    let win = false;
    let player = null;
    const sqrt = Math.sqrt(this.boardSize);

    for (let i = 0; i < sqrt; i++) {
      player = this.board[i];
      if (player === null) continue;
      win = true;
      for (let j = 1; j < sqrt; j++) {
        if (this.board[i + j * sqrt] !== player) {
          win = false;
          break;
        }
      }
      if (win) return { win, player };
    }
    return { win, player: null };
  }

  @action
  calculateDiagonalWin() {
    let win = false;
    let player = this.board[0];
    const sqrt = Math.sqrt(this.boardSize);

    if (player !== null) {
      win = true;
      for (let i = 1; i < sqrt; i++) {
        if (this.board[i * (sqrt + 1)] !== player) {
          win = false;
          break;
        }
      }
      if (win) return { win, player };
    }

    win = false;
    player = this.board[sqrt - 1];
    if (player !== null) {
      win = true;
      for (let i = 1; i < sqrt; i++) {
        if (this.board[(i + 1) * sqrt - i - 1] !== player) {
          win = false;
          break;
        }
      }
      if (win) return { win, player };
    }
    return { win, player: null };
  }
}
