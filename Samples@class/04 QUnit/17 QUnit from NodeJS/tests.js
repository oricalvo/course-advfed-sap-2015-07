var QUnit = require("qunitjs");

QUnit.test("Test 1", function (assert) {
    assert.equal("a", "a1", "Expected value is a");
});

QUnit.test("Test 2", function (assert) {
    assert.equal("a", "a", "Expected value is a");
});

QUnit.log(function (test) {
    console.log(test.name + ": " + (test.result ? "PASS" : "FAIL"));
});

QUnit.done(function (res) {
    console.log();
    console.log(res);
});

QUnit.load();
