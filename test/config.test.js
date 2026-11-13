const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('el archivo de pedidos configurado existe y contiene una lista JSON', () => {
  const root = path.resolve(__dirname, '..');
  const config = JSON.parse(fs.readFileSync(path.join(root, 'config', 'app.json'), 'utf8'));

  assert.equal(typeof config.ordersFile, 'string', 'ordersFile debe ser una ruta');
  const ordersPath = path.resolve(root, config.ordersFile);
  assert.ok(fs.existsSync(ordersPath), `No existe el archivo de pedidos: ${ordersPath}`);

  const orders = JSON.parse(fs.readFileSync(ordersPath, 'utf8'));
  assert.ok(Array.isArray(orders), `El archivo de pedidos debe contener una lista JSON: ${ordersPath}`);
});
