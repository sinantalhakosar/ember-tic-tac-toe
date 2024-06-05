import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-tic-tac-toe/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

const properties = {
  text: 'Dialog text',
  primaryActionText: 'Yes',
  secondaryActionText: 'No',
  primaryAction: () => {},
  secondaryAction: () => {},
  onClose: () => {},
};

module('Integration | Component | common/dialog', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.setProperties({
      ...properties,
      primaryAction: () => assert.step('primaryAction'),
      secondaryAction: () => assert.step('secondaryAction'),
      onClose: () => assert.step('onClose'),
    });

    await render(hbs`<Common::Dialog 
      @text={{this.text}}
      @primaryActionText={{this.primaryActionText}}
      @secondaryActionText={{this.secondaryActionText}}
      @primaryAction={{this.primaryAction}}
      @secondaryAction={{this.secondaryAction}}
      @onClose={{this.onClose}}
    />`);

    assert.dom('[data-testid="text"]').hasText('Dialog text');
    assert.dom('[data-testid="primary-action"]').hasText('Yes');
    assert.dom('[data-testid="secondary-action"]').hasText('No');

    await click('[data-testid="primary-action"]');
    await click('[data-testid="secondary-action"]');
    await click('[data-testid="close-button"]');

    assert.verifySteps(['primaryAction', 'secondaryAction', 'onClose']);
  });
});
