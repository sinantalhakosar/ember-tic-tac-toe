import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-tic-tac-toe/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | navbar', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the content inside a navbar', async function (assert) {
    await render(hbs`<Common::Navbar />`);

    assert.dom('[data-testid="navbar"]').exists();
    assert.dom('[data-testid="index"]').exists().hasAttribute('href', '/');
    assert.dom('[data-testid="index"] > img').exists();
    assert
      .dom('[data-testid="contact"]')
      .exists()
      .hasText('Contact')
      .hasAttribute('href', '/contact');
  });
});
