import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-tic-tac-toe/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | play/scores', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<Play::Scores @scoreX={{3}} @scoreO={{2}} />`);

    assert.dom('[data-testid="label"]').hasText('Scores:');

    assert.dom('[data-testid="score-x"]').hasText(': 3');
    assert.dom('[data-testid="score-x-icon"]').exists();

    assert.dom('[data-testid="score-o"]').hasText(': 2');
    assert.dom('[data-testid="score-o-icon"]').exists();
  });
});
