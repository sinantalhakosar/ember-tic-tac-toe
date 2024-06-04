import { module, test } from 'qunit';
import { visit, currentURL, findAll } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-tic-tac-toe/tests/helpers';

module('Acceptance | play', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /play', async function (assert) {
    await visit('/play');

    assert.strictEqual(currentURL(), '/play');
  });

  test('it renders a 3x3 grid of squares', async function (assert) {
    await visit('/play');

    let squares = findAll('[data-testid="board"] [data-testid="square"]');
    assert.strictEqual(squares.length, 9, 'There should be 9 squares');
  });
});
