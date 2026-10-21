// The Node runtime is pinned on several surfaces; they must name the same
// release, and that release must reject the distrusted eMudhra CA (#7).
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const read = (file) => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');

// First releases with "tls: reject chains containing blocked public keys"
// (nodejs/node#66871) on each supported line.
const FIRST_FIXED = { 22: [22, 23, 4], 24: [24, 22, 1] };

const dockerPin = read('Dockerfile').match(/^FROM node:(\d+\.\d+\.\d+)@sha256:[0-9a-f]{64}$/m);

test('Dockerfile pins node by exact version and digest', () => {
  assert.ok(dockerPin, 'expected FROM node:<x.y.z>@sha256:<digest>');
});

test('pinned release carries the eMudhra blocklist', () => {
  const [major, minor, patch] = dockerPin[1].split('.').map(Number);
  const fixed = FIRST_FIXED[major];
  assert.ok(fixed, `node ${major} is not a supported LTS line with the fix`);
  const cmp = minor - fixed[1] || patch - fixed[2];
  assert.ok(cmp >= 0, `node ${dockerPin[1]} predates ${fixed.join('.')}`);
});

test('every runtime surface names the Dockerfile release', () => {
  const version = dockerPin[1];
  assert.strictEqual(read('.nvmrc').trim(), version, '.nvmrc');
  assert.strictEqual(JSON.parse(read('package.json')).engines?.node, version, 'package.json engines.node');
  assert.strictEqual(JSON.parse(read('package-lock.json')).packages[''].engines?.node, version, 'package-lock.json engines.node');
  assert.match(read('README.md'), new RegExp(`Node ${version.replace(/\./g, '\\.')}\\b`), 'README prerequisites');
});
