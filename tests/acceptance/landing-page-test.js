import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
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
    assert
      .dom('[data-testid="play-with-ai-button"]')
      .hasText('Play Against AI');
  });
});
