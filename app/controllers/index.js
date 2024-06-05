import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class IndexController extends Controller {
  @service router;

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
}
