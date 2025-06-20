const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST || '35.224.165.199',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'mauriciocosta',
  password: process.env.DB_PASSWORD || 'ylc,L%}9?6En~e#L',
  database: process.env.DB_NAME || 'belpao'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco de dados:', err);
  } else {
    console.log('Conectado ao MySQL com sucesso!');
  }
});

module.exports = db;

