import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | toast', function (hooks) {
  setupTest(hooks);

  test('it adds and removes messages', function (assert) {
    let service = this.owner.lookup('service:toast');

    assert.strictEqual(
      service.messages.length,
      0,
      'Initially, there are no messages',
    );

    service.addMessage('success', 'Test message');

    assert.strictEqual(
      service.messages.length,
      1,
      'After adding a message, there is one message',
    );
    assert.strictEqual(
      service.messages[0].type,
      'success',
      'The message type is correct',
    );
    assert.strictEqual(
      service.messages[0].text,
      'Test message',
      'The message text is correct',
    );

    service.removeMessage(service.messages[0].id);

    assert.strictEqual(
      service.messages.length,
      0,
      'After removing the message, there are no messages',
    );
  });

  test('it adds and removes message after timeout', function (assert) {
    let service = this.owner.lookup('service:toast');
    let done = assert.async(1); // Expect async assertion, indicate that there is one asynchronous operation that needs to complete before the test is considered finished

    assert.strictEqual(
      service.messages.length,
      0,
      'Initially, there are no messages',
    );

    service.addMessage('success', 'Test message 1');

    setTimeout(() => {
      assert.strictEqual(
        service.messages.length,
        0,
        'After >3 seconds, message is removed',
      );
      done();
    }, 3500);
  });
});
