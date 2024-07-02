import { tracked } from '@glimmer/tracking';
import Service, { service } from '@ember/service';

export default class OpenaiBotService extends Service {
  @tracked loading = false;
  @tracked playWithAIEnabled = true;

  @service toast;
  @service game;

  async getBotMove(board) {
    try {
      let response = await fetch('/.netlify/functions/playAI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startingPlayer: this.game.startingPlayer,
          board: board,
        }),
      });
      let data = await response.json();

      if (data.error) {
        this.playWithAIEnabled = false;
        this.toast.error(data.error);
        return { index: null, value: null };
      }

      return data;
    } catch (error) {
      console.log('error', error);
      this.toast.error(
        'There is some problem with the AI. Please contact with the developer.',
      );

      return { index: null, value: null };
    }
  }
}
