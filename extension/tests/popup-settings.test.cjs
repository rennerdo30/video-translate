const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

for (const [stored, expected] of [[0, 0], [undefined, 0.8], [0.5, 0.5]]) {
  test(`saved volume ${stored} loads as ${expected}`, async () => {
    const nodes = new Map();
    const document = {
      getElementById(id) {
        if (!nodes.has(id)) nodes.set(id, { style: {}, classList: { add() {}, remove() {} } });
        return nodes.get(id);
      },
      addEventListener() {},
    };
    const context = vm.createContext({ document, Intl, setTimeout, clearTimeout,
      console: { error(error) { throw error; } },
      chrome: { i18n: { getMessage: key => key }, runtime: {
        sendMessage(message, callback) { callback({ ttsVolume: stored }); },
      } },
    });
    vm.runInContext(fs.readFileSync(path.join(__dirname, '../src/popup/popup.js'), 'utf8'), context);
    await vm.runInContext('loadConfig()', context);
    assert.equal(nodes.get('ttsVolume').value, expected);
    assert.equal(nodes.get('ttsVolumeValue').textContent, new Intl.NumberFormat(undefined, { style: 'percent', maximumFractionDigits: 0 }).format(expected));
  });
}
