const getItemID = require('../src/index');
// global.document = require('../');

test('get id is "NameList"', () => {
  expect(getItemID('NameList')).toBe('NameList');
});
