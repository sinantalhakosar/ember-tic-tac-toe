import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class PlayRouteController extends Controller {
  @tracked turn = 0;

  @action
  onChangeTurnClick() {
    this.turn = this.turn ? 0 : 1;
  }
}
