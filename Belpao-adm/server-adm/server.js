const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const db = require('./db');

const app = express();
const port = 3001;

// Iniciar servidor
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${port} e aceitando conexões externas`);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Configuração do multer para upload de imagens
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// ===== LOGIN DO ADMINISTRADOR =====
app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;
  const query = 'SELECT * FROM usuario WHERE email = ? AND senha = ? AND perfil = "adm"';

  db.query(query, [email, senha], (err, results) => {
    if (err) return res.status(500).json({ mensagem: 'Erro no servidor' });
    if (results.length === 0) return res.status(401).json({ mensagem: 'Credenciais inválidas' });

    res.json({ sucesso: true, usuario: results[0] });
  });
});

// ===== CRUD DE PRODUTOS =====

// Cadastrar novo produto
app.post('/api/produtos', upload.single('imagem'), (req, res) => {

  const { categoria, nome, descricao, preco } = req.body;
  const imagem = req.file ? req.file.buffer : null;

  if (!categoria || !nome || !descricao || !preco) {
    return res.status(400).json({ erro: 'Todos os campos obrigatórios devem ser preenchidos.' });
  }

  const query = 'INSERT INTO produto (categoria, nome, descricao, preco, imagem) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [categoria, nome, descricao, preco, imagem], (err, result) => {
    if (err) {
      console.error("Erro no MySQL:", err);
      return res.status(500).json({ erro: 'Erro ao salvar produto' });
    }
    res.status(201).json({ mensagem: 'Produto salvo com sucesso!' });
  });
});


// Listar todos os produtos
app.get('/api/produtos', (req, res) => {
  db.query('SELECT * FROM produto', (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar produtos' });

    const produtos = results.map((prod) => ({
      ...prod,
      imagem: prod.imagem ? `data:image/jpeg;base64,${prod.imagem.toString('base64')}` : null,
    }));
    res.json(produtos);
  });
});

// Buscar um produto específico por ID
app.get('/api/produtos/:id', (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM produto WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar produto' });
    if (results.length === 0) return res.status(404).json({ erro: 'Produto não encontrado' });

    const prod = results[0];
    res.json({
      ...prod,
      imagem: prod.imagem ? `data:image/jpeg;base64,${prod.imagem.toString('base64')}` : null,
    });
  });
});

// Atualizar um produto
app.put('/api/produtos/:id', upload.single('imagem'), (req, res) => {
  const { id } = req.params;
  const { categoria, nome, descricao, preco } = req.body;
  const imagem = req.file ? req.file.buffer : null;

  let query, values;

  if (imagem) {
    query = 'UPDATE produto SET categoria = ?, nome = ?, descricao = ?, preco = ?, imagem = ? WHERE id = ?';
    values = [categoria, nome, descricao, preco, imagem, id];
  } else {
    query = 'UPDATE produto SET categoria = ?, nome = ?, descricao = ?, preco = ? WHERE id = ?';
    values = [categoria, nome, descricao, preco, id];
  }

  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ erro: 'Erro ao atualizar produto' });
    res.json({ mensagem: 'Produto atualizado com sucesso!' });
  });
});

// Excluir um produto
app.delete('/api/produtos/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM produto WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ erro: 'Erro ao excluir produto' });
    res.json({ mensagem: 'Produto excluído com sucesso!' });
  });
});

