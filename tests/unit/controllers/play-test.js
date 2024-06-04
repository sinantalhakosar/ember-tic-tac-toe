// tests/unit/routes/play-test.js
import { module, test } from 'qunit';
import { setupTest } from 'ember-tic-tac-toe/tests/helpers';

module('Unit | Controller | play', function (hooks) {
  setupTest(hooks);

  test('calculateHorizontalWin works correctly', function (assert) {
    let controller = this.owner.lookup('controller:play');
    controller.board = ['X', 'X', 'X', 'O', 'O', null, null, null, null];
    controller.boardSize = 9;
    let result = controller.calculateHorizontalWin();
    assert.deepEqual(result, { win: true, player: 'X' });

    // no win case
    controller.board = ['X', 'O', 'X', 'O', 'O', 'X', 'X', 'X', 'O'];
    result = controller.calculateHorizontalWin();
    assert.deepEqual(result, { win: false, player: null });

    // Buggy case: no win
    controller.board = ['X', 'O', 'X', 'O', 'X', null, null, 'O', null];
    result = controller.calculateHorizontalWin();
    assert.deepEqual(result, { win: false, player: null });
  });

  test('calculateVerticalWin works correctly', function (assert) {
    let controller = this.owner.lookup('controller:play');
    controller.board = ['X', 'O', null, 'X', 'O', null, 'X', null, null];
    controller.boardSize = 9;
    let result = controller.calculateVerticalWin();
    assert.deepEqual(result, { win: true, player: 'X' });

    // no win case
    controller.board = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
    result = controller.calculateVerticalWin();
    assert.deepEqual(result, { win: false, player: null });

    // Buggy case: no win
    controller.board = ['X', 'O', 'X', 'O', 'X', null, null, 'O', null];
    result = controller.calculateVerticalWin();
    assert.deepEqual(result, { win: false, player: null });
  });

  test('calculateDiagonalWin works correctly', function (assert) {
    let controller = this.owner.lookup('controller:play');
    controller.board = ['X', 'O', null, 'O', 'X', null, null, null, 'X'];
    controller.boardSize = 9;
    let result = controller.calculateDiagonalWin();
    assert.deepEqual(result, { win: true, player: 'X' });

    // no win case
    controller.board = ['X', 'O', 'X', 'O', 'O', 'X', 'X', 'X', 'O'];
    result = controller.calculateDiagonalWin();
    assert.deepEqual(result, { win: false, player: null });

    // Buggy case: no win
    controller.board = ['X', 'O', 'X', 'O', 'X', null, null, 'O', null];
    result = controller.calculateDiagonalWin();
    assert.deepEqual(result, { win: false, player: null });
  });

  test('calculateWin works correctly', function (assert) {
    let controller = this.owner.lookup('controller:play');

    // Horizontal win
    controller.board = ['X', 'X', 'X', 'O', 'O', null, null, null, null];
    controller.boardSize = 9;
    let result = controller.calculateWin();
    assert.deepEqual(result, { win: true, player: 'X' });

    // Vertical win
    controller.board = ['X', 'O', null, 'X', 'O', null, 'X', null, null];
    result = controller.calculateWin();
    assert.deepEqual(result, { win: true, player: 'X' });

    // Diagonal win
    controller.board = ['X', 'O', null, 'O', 'X', null, null, null, 'X'];
    result = controller.calculateWin();
    assert.deepEqual(result, { win: true, player: 'X' });

    // no win case
    controller.board = ['X', 'O', 'X', 'O', 'O', 'X', 'X', 'X', 'O'];
    result = controller.calculateWin();
    assert.deepEqual(result, { win: false });

    // Buggy case: no win
    controller.board = ['X', 'O', 'X', 'O', 'X', null, null, 'O', null];
    result = controller.calculateWin();
    assert.deepEqual(result, { win: false });
  });
});
