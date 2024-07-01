import { module, test } from 'qunit';
import { setupTest } from 'ember-tic-tac-toe/tests/helpers';

module('Unit | Controller | play', function (hooks) {
  setupTest(hooks);

  test('it opens dialog on win', function (assert) {
    let controller = this.owner.lookup('controller:play');
    let service = this.owner.lookup('service:game');

    service.set('board', [
      { index: 0, value: 'X' },
      { index: 1, value: 'X' },
      { index: 2, value: null },
      { index: 3, value: 'O' },
      { index: 4, value: 'O' },
      { index: 5, value: null },
      { index: 6, value: null },
      { index: 7, value: null },
      { index: 8, value: null },
    ]);

    service.set('turn', 0);
    service.set('winIndexes', [null, null, null]);

    controller.onSquareClick('X', 2);

    assert.true(service.isWin, 'isWin should return true');
  });

  test('it does not open dialog on no win', function (assert) {
    let controller = this.owner.lookup('controller:play');
    let service = this.owner.lookup('service:game');

    service.set('board', [
      { index: 0, value: 'X' },
      { index: 1, value: 'X' },
      { index: 2, value: null },
      { index: 3, value: 'O' },
      { index: 4, value: 'O' },
      { index: 5, value: null },
      { index: 6, value: null },
      { index: 7, value: null },
      { index: 8, value: null },
    ]);

    service.set('turn', 0);
    service.set('winIndexes', [null, null, null]);

    controller.onSquareClick('X', 8);

    assert.false(service.isWin, 'isWin should return false');
  });

  test('calculateHorizontalWin works correctly', function (assert) {
    let service = this.owner.lookup('service:game');

    service.set('board', [
      { index: 0, value: 'X' },
      { index: 1, value: 'X' },
      { index: 2, value: 'X' },
      { index: 3, value: 'O' },
      { index: 4, value: 'O' },
      { index: 5, value: null },
      { index: 6, value: null },
      { index: 7, value: null },
      { index: 8, value: null },
    ]);
    service.boardSize = 9;
    let result = service.calculateHorizontalWin();
    assert.true(result, 'should return true');

    // no win case
    service.set('board', [
      { index: 0, value: 'X' },
      { index: 1, value: 'O' },
      { index: 2, value: 'X' },
      { index: 3, value: 'O' },
      { index: 4, value: 'O' },
      { index: 5, value: 'X' },
      { index: 6, value: 'X' },
      { index: 7, value: 'X' },
      { index: 8, value: 'O' },
    ]);
    result = service.calculateHorizontalWin();
    assert.false(result, 'should return false');

    // Buggy case: no win
    service.set('board', [
      { index: 0, value: 'X' },
      { index: 1, value: 'O' },
      { index: 2, value: 'X' },
      { index: 3, value: 'O' },
      { index: 4, value: 'X' },
      { index: 5, value: null },
      { index: 6, value: null },
      { index: 7, value: 'O' },
      { index: 8, value: null },
    ]);
    result = service.calculateHorizontalWin();
    assert.false(result, 'should return false');
  });

  test('calculateVerticalWin works correctly', function (assert) {
    let service = this.owner.lookup('service:game');

    service.set('board', [
      { index: 0, value: 'X' },
      { index: 1, value: 'O' },
      { index: 2, value: null },
      { index: 3, value: 'X' },
      { index: 4, value: 'O' },
      { index: 5, value: null },
      { index: 6, value: 'X' },
      { index: 7, value: null },
      { index: 8, value: null },
    ]);

    service.boardSize = 9;
    let result = service.calculateVerticalWin();
    assert.true(result, 'should return true');

    // no win case
    service.board = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
    service.set('board', [
      { index: 0, value: 'X' },
      { index: 1, value: 'O' },
      { index: 2, value: 'X' },
      { index: 3, value: 'O' },
      { index: 4, value: 'X' },
      { index: 5, value: 'O' },
      { index: 6, value: 'X' },
      { index: 7, value: 'O' },
      { index: 8, value: 'X' },
    ]);
    result = service.calculateVerticalWin();
    assert.false(result, 'should return false');

    // Buggy case: no win
    service.board = ['X', 'O', 'X', 'O', 'X', null, null, 'O', null];
    service.set('board', [
      { index: 0, value: 'X' },
      { index: 1, value: 'O' },
      { index: 2, value: 'X' },
      { index: 3, value: 'O' },
      { index: 4, value: 'X' },
      { index: 5, value: null },
      { index: 6, value: null },
      { index: 7, value: 'O' },
      { index: 8, value: null },
    ]);
    result = service.calculateVerticalWin();
    assert.false(result, 'should return false');
  });

  test('calculateDiagonalWin works correctly', function (assert) {
    let service = this.owner.lookup('service:game');

    service.set('board', [
      { index: 0, value: 'X' },
      { index: 1, value: 'O' },
      { index: 2, value: null },
      { index: 3, value: 'O' },
      { index: 4, value: 'X' },
      { index: 5, value: null },
      { index: 6, value: null },
      { index: 7, value: null },
      { index: 8, value: 'X' },
    ]);
    service.boardSize = 9;
    let result = service.calculateDiagonalWin();
    assert.true(result, 'should return true');

    // no win case
    service.set('board', [
      { index: 0, value: 'X' },
      { index: 1, value: 'O' },
      { index: 2, value: 'X' },
      { index: 3, value: 'O' },
      { index: 4, value: 'O' },
      { index: 5, value: 'X' },
      { index: 6, value: 'X' },
      { index: 7, value: 'X' },
      { index: 8, value: 'O' },
    ]);
    result = service.calculateDiagonalWin();
    assert.false(result, 'should return false');

    // Buggy case: no win
    service.set('board', [
      { index: 0, value: 'X' },
      { index: 1, value: 'O' },
      { index: 2, value: 'X' },
      { index: 3, value: 'O' },
      { index: 4, value: 'X' },
      { index: 5, value: null },
      { index: 6, value: null },
      { index: 7, value: 'O' },
      { index: 8, value: null },
    ]);
    result = service.calculateDiagonalWin();
    assert.false(result, 'should return false');
  });

  test('calculateResult works correctly', function (assert) {
    let service = this.owner.lookup('service:game');

    // Horizontal win
    service.set('board', [
      { index: 0, value: 'X' },
      { index: 1, value: 'X' },
      { index: 2, value: 'X' },
      { index: 3, value: 'O' },
      { index: 4, value: 'O' },
      { index: 5, value: null },
      { index: 6, value: null },
      { index: 7, value: null },
      { index: 8, value: null },
    ]);
    service.boardSize = 9;
    let result = service.calculateResult();
    assert.true(result, 'should return true');

    // Vertical win
    service.isWin = false;
    service.isDraw = false;
    service.set('board', [
      { index: 0, value: 'X' },
      { index: 1, value: 'O' },
      { index: 2, value: null },
      { index: 3, value: 'X' },
      { index: 4, value: 'O' },
      { index: 5, value: null },
      { index: 6, value: 'X' },
      { index: 7, value: null },
      { index: 8, value: null },
    ]);
    result = service.calculateResult();
    assert.true(result, 'should return true');

    // Diagonal win
    service.isWin = false;
    service.isDraw = false;
    service.set('board', [
      { index: 0, value: 'X' },
      { index: 1, value: 'O' },
      { index: 2, value: null },
      { index: 3, value: 'O' },
      { index: 4, value: 'X' },
      { index: 5, value: null },
      { index: 6, value: null },
      { index: 7, value: null },
      { index: 8, value: 'X' },
    ]);
    result = service.calculateResult();
    assert.true(result, 'should return true');

    // no win case
    // but draw
    service.isWin = false;
    service.isDraw = false;
    service.set('board', [
      { index: 0, value: 'X' },
      { index: 1, value: 'O' },
      { index: 2, value: 'X' },
      { index: 3, value: 'O' },
      { index: 4, value: 'O' },
      { index: 5, value: 'X' },
      { index: 6, value: 'X' },
      { index: 7, value: 'X' },
      { index: 8, value: 'O' },
    ]);
    result = service.calculateResult();
    assert.true(result, 'should return true [draw]');
    assert.false(service.isWin, 'isWin should return false');
    assert.true(service.isDraw, 'isDraw should return true');

    // Buggy case: no win
    service.isWin = false;
    service.isDraw = false;
    service.set('board', [
      { index: 0, value: 'X' },
      { index: 1, value: 'O' },
      { index: 2, value: 'X' },
      { index: 3, value: 'O' },
      { index: 4, value: 'X' },
      { index: 5, value: null },
      { index: 6, value: null },
      { index: 7, value: 'O' },
      { index: 8, value: null },
    ]);
    result = service.calculateResult();
    assert.false(result, 'should return false');
  });
});
