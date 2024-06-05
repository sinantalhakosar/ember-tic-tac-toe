import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-tic-tac-toe/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Service from '@ember/service';

const properties = {
  initialValue: null,
  turn: 0,
  index: 0,
  disabled: false,
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
        @disabled={{this.disabled}}
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
      @disabled={{this.disabled}}
      @onClick={{this.onClick}}
      />
    `);

    await click('[data-testid="square"]');

    assert.dom('img').hasAttribute('src', '../assets/images/XSymbol.png');
  });

  test('it changes value on click for O turn', async function (assert) {
    this.setProperties({ ...properties, turn: 1 });

    await render(hbs`
      <Play::Square
      @initialValue={{this.initialValue}}
      @turn={{this.turn}}
      @index={{this.index}}
      @disabled={{this.disabled}}
      @onClick={{this.onClick}}
      />
    `);

    await click('[data-testid="square"]');

    assert.dom('img').hasAttribute('src', '../assets/images/OSymbol.png');
  });

  test('it shows an alert when the square is already taken', async function (assert) {
    this.setProperties({ ...properties, initialValue: 'X' });

    this.owner.register(
      'service:toast',
      class extends Service {
        warning(text) {
          assert.strictEqual(
            text,
            'This square is already taken!',
            'The toast text is correct',
          );
        }
      },
    );

    await render(hbs`
      <Play::Square
      @initialValue={{this.initialValue}}
      @turn={{this.turn}}
      @index={{this.index}}
      @disabled={{this.disabled}}
      @onClick={{this.onClick}}
      />
    `);

    await click('[data-testid="square"]');
  });

  test('it shows an alert when the square is disabled', async function (assert) {
    this.setProperties({ ...properties, initialValue: 'X', disabled: true });

    this.owner.register(
      'service:toast',
      class extends Service {
        error(text) {
          assert.strictEqual(
            text,
            'This game is already over.',
            'The toast text is correct',
          );
        }
      },
    );

    await render(hbs`
      <Play::Square
      @initialValue={{this.initialValue}}
      @turn={{this.turn}}
      @index={{this.index}}
      @disabled={{this.disabled}}
      @onClick={{this.onClick}}
      />
    `);

    await click('[data-testid="square"]');
  });
});
