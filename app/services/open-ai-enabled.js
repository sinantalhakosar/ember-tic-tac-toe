import Service from '@ember/service';
import ENV from 'ember-tic-tac-toe/config/environment';

export default class OpenAiEnabledService extends Service {
  isAIEnabled() {
    const playAI = localStorage.getItem('play-ai');
    return ENV.OPENAI_API_KEY && playAI === 'true';
  }
}
