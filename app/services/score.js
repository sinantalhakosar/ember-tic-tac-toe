import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { set } from '@ember/object';

export default class ScoreService extends Service {
  @tracked scores = { X: 0, O: 0 };

  updateScores(winner) {
    set(this.scores, winner, this.scores[winner] + 1);
  }

  initScores() {
    this.scores = { X: 0, O: 0 };
  }
}
