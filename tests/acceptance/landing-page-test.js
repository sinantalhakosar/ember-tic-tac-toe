import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-tic-tac-toe/tests/helpers';

module('Acceptance | landing page', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
    assert.dom('[data-testid="logo"]').exists();

    assert
      .dom('[data-testid="description"]')
      .hasText('Tic-tac-toe, or Xs and Os is a game for two players');

    assert.dom('[data-testid="play-button"]').hasText('Play');
    await click('[data-testid="play-button"]');
    assert.strictEqual(currentURL(), '/play');

    await visit('/');

    assert.dom('[data-testid="play-with-ai-button"]').hasText('Play With AI');
    await click('[data-testid="play-with-ai-button"]');
    assert.strictEqual(currentURL(), '/play-with-ai');
  });
});
