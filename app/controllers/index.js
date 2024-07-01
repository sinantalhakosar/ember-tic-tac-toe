import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class IndexController extends Controller {
  @service router;
  @service game;
  @service score;

  @action
  playGame() {
    this.score.initScores();
    this.game.reset();
    this.router.transitionTo('play');
  }

  @action
  playGameWithAI() {
    this.score.initScores();
    this.game.reset();
    this.router.transitionTo('play-with-ai');
  }

  @action
  handleIconClick() {
    this.game.startingPlayer = this.game.startingPlayer === 'X' ? 'O' : 'X';
    this.game.turn = this.game.startingPlayer === 'X' ? 0 : 1;
  }
}
