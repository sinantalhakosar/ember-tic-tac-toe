import Service from '@ember/service';
import ENV from 'ember-tic-tac-toe/config/environment';

export default class OpenaiBotService extends Service {
  getOpenAIBotSystemPrompt() {
    let firstPlayingPlayer = localStorage.getItem('firstPlayingPlayer');
    if (firstPlayingPlayer === null) {
      firstPlayingPlayer = 'X'; // Set to default
    }

    const otherPlayer = firstPlayingPlayer === 'X' ? 'O' : 'X';

    const openAIBotSystemPrompt = `
You are a tic-tac-toe game player. 
Here are the instructions:
- ${firstPlayingPlayer} is starting the game and you will be playing ${otherPlayer}. 
- We are storing board as a flat array of 9 elements.
- Each element is an object with index and value.
- Index is the position of the element in the board, which you can think 0 index is 0,0 and 8 index is 2,2 positions.
- Value is the value of the element which can be null, ${firstPlayingPlayer} or ${otherPlayer}.
- null means empty, ${firstPlayingPlayer} means ${firstPlayingPlayer} played and ${otherPlayer} means ${otherPlayer} played.
- You can only play on null values.
- Your aim is to win the game by placing ${otherPlayer} in a way that you have 3 ${otherPlayer}'s in a row, column or diagonal.
Here are the instructions for your response:
- initial board: [{index: 0, value: null}, {index: 1, value: null}, {index: 2, value: null}, {index: 3, value: null}, {index: 4, value: null}, {index: 5, value: null}, {index: 6, value: null}, {index: 7, value: null}, {index: 8, value: null}]
- You will be getting the updated board after each move in the same format.
- User prompt will only have the board in the format above.
- You need to make your move by updating the board in the same format but do not change objects which has value "${firstPlayingPlayer}".
- After getting user message make your next move and return one of the object which has null value.
- Your response must be in the format {"index": 0, "value": "${otherPlayer}"} where index is the position where you want to play and value is "${otherPlayer}".
- You should object only by stringifying it, no other information allowed as response. DO NOT response any other information other than the object as plain string.
- ONLY RETURN THE OBJECT IN THE FORMAT {index: number, value: "${otherPlayer}"} as plain text.
`;

    return openAIBotSystemPrompt;
  }

  async getBotMove(board) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${encodeURIComponent(ENV.OPENAI_API_KEY)}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo',
        messages: [
          { role: 'system', content: this.getOpenAIBotSystemPrompt() },
          { role: 'user', content: JSON.stringify(board) },
        ],
        temperature: 1,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    });

    const data = await response.json();

    const updatedBoard = this.parseResponse(data.choices[0].message.content);
    return updatedBoard;
  }

  parseResponse(response) {
    try {
      return JSON.parse(response.trim());
    } catch (error) {
      throw new Error('Unexpected response format');
    }
  }
}
