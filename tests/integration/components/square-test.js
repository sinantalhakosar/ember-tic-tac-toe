import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-tic-tac-toe/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

const properties = {
  initialValue: null,
  turn: 0,
  index: 0,
  onClick: () => {},
};

module('Integration | Component | square', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders empty square', async function (assert) {
    this.setProperties(properties);

    await render(hbs`
      <Play::Square
        @initialValue={{this.initialValue}}
        @turn={{this.turn}}
        @index={{this.index}}
        @onClick={{this.onClick}}
      />
    `);

    assert.dom().hasText('');
  });

  test('it changes value on click for X turn', async function (assert) {
    this.setProperties(properties);

    await render(hbs`
      <Play::Square
      @initialValue={{this.initialValue}}
      @turn={{this.turn}}
      @index={{this.index}}
      @onClick={{this.onClick}}
      />
    `);

    await click('[data-testid="square"]');

    assert.dom().hasText('X');
  });

  test('it changes value on click for O turn', async function (assert) {
    this.setProperties({ ...properties, turn: 1 });

    await render(hbs`
      <Play::Square
      @initialValue={{this.initialValue}}
      @turn={{this.turn}}
      @index={{this.index}}
      @onClick={{this.onClick}}
      />
    `);

    await click('[data-testid="square"]');

    assert.dom().hasText('O');
  });

  test('it shows an alert when the square is already taken', async function (assert) {
    this.setProperties({ ...properties, initialValue: 'X' });

    await render(hbs`
      <Play::Square
      @initialValue={{this.initialValue}}
      @turn={{this.turn}}
      @index={{this.index}}
      @onClick={{this.onClick}}
      />
    `);

    let originalAlert = window.alert; // save original alert
    window.alert = (message) => {
      this.alertMessage = message;
    }; // mock alert

    await click('[data-testid="square"]');

    assert.strictEqual(this.alertMessage, 'This square is already taken');

    window.alert = originalAlert; // restore original alert
  });
});
