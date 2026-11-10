const express = require('express');
const fs = require('fs');
const path = require('path');
const config = require('./config/app.json');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/orders', (req, res) => {
  fs.readFile(path.resolve(__dirname, config.ordersFile), 'utf8', (error, data) => {
    if (error) return res.status(503).json({ error: 'No se pueden cargar los pedidos.' });

    try {
      res.json(JSON.parse(data));
    } catch (error) {
      res.status(503).json({ error: 'No se pueden cargar los pedidos.' });
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Pedidos DevOps disponible en http://localhost:${port}`);
});