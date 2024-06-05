import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  @tracked startingPlayer = 'X';
  @tracked toggleClasses = 'bg-red-500 -translate-x-2';

  @service router;

  constructor() {
    super(...arguments);
    let startingPlayer = localStorage.getItem('firstPlayingPlayer');
    if (!startingPlayer) {
      startingPlayer = 'X';
      localStorage.setItem('firstPlayingPlayer', startingPlayer);
    }
    this.startingPlayer = startingPlayer;
    this.toggleClasses =
      startingPlayer === 'X'
        ? 'bg-red-500 -translate-x-2'
        : 'bg-blue-500 translate-x-full';
  }

  _initScoresFromLocalStorage() {
    const scores = localStorage.getItem('scores');

    if (scores) {
      this.scores = JSON.parse(scores);
      localStorage.removeItem('scores');
    }
  }

  @action
  playGame() {
    this._initScoresFromLocalStorage();
    this.router.transitionTo('play').then(() => window.location.reload());
  }

  @action
  playGameWithAI() {
    this._initScoresFromLocalStorage();
    this.router
      .transitionTo('play-with-ai')
      .then(() => window.location.reload());
  }

  @action
  handleIconClick() {
    if (this.startingPlayer === 'X') {
      localStorage.setItem('firstPlayingPlayer', 'O');
      this.startingPlayer = 'O';
      this.toggleClasses = 'bg-blue-500 translate-x-full';
    } else {
      localStorage.setItem('firstPlayingPlayer', 'X');
      this.startingPlayer = 'X';
      this.toggleClasses = 'bg-red-500 -translate-x-2';
    }
  }
}
