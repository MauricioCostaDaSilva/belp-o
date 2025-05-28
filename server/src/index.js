import cors from 'cors'
import express from 'express'
import jwt from 'jsonwebtoken'
import console, { error } from 'node:console'
import process from 'node:process'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import queryBuilder from './queryBuilder.js'

const app = express()
const PORT = process.env.PORT || 3000

// Configuração do Swagger para documentação da API
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Belp-o API',
      version: '1.0.0',
      description: 'Documentação da API do Belp-o',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./src/index.js'], // Caminho para os arquivos com as anotações Swagger
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// permite que o frontend acesse o backend
app.use(cors())
// permite que o backend entenda o json
app.use(express.json())
// permite que o backend entenda dados urlencoded
app.use(express.urlencoded({ extended: true }))

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Verifica o status da API
 *     responses:
 *       200:
 *         description: Retorna o status da API
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */
app.get('/health', async (req, response) => {
  // Verifica se o banco de dados está conectado
  response
    .status(200)
    .json({ status: 'ok' })
})

/**
 * @swagger
 * /token:
 *   post:
 *     summary: Gera um token de autenticação para o usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nome de usuário
 *                 example: usuario123
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Token gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT gerado
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 usuario:
 *                   type: object
 *                   description: Dados do usuário autenticado
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID do usuário
 *                       example: 1
 *                     username:
 *                       type: string
 *                       description: Nome de usuário
 *                       example: usuario123
 *       400:
 *         description: Requisição inválida (usuário ou senha não informados)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuário e senha são obrigatórios
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuário ou senha inválidos
 */


app.post('/token', async (req, response) => {
  const { username, password } = req.body

  // Verifica se o usuário e a senha foram informados, caso contrário retorna erro
  if (!username || !password) {
    return response
      .status(400)
      .json({ error: 'Usuário e senha são obrigatórios' })
  }

  // consulta o banco de dados buscando o usuário e a senha
  const [results] = await queryBuilder.raw(`
    SELECT * FROM usuario WHERE email = ? AND senha = ? LIMIT 1
  `, [username, password])

  // Verifica se retornou algum resultado, caso contrário retorna erro
  if (results.length === 0) {
    return response
      .status(401)
      .json({ error: 'Usuário ou senha inválidos' })
  }


  const usuario = results[0]
  // remove a senha do usuário antes de retornar os dados para evitar que ela seja exposta
  delete usuario.senha
  // cria o token com os dados do usuário
  const token = jwt.sign(
    usuario,
    'your_secret_key'
  )

  response
    .status(200)
    .json({ token, usuario })
})

 app.get('/catalogo', (request, response) => {
  response.json([
    {
      id: 1,
      nome: 'Pão Francês',
      descricao: 'Unidade de pão francês quentinho e crocante',
      preco: 1.0,
      categoria: 'Pães',
      imagem: 'https://s2-receitas.glbimg.com/-V4nFrbjz9JMuWJnvQxl2NEplg8=/0x0:1280x922/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2020/U/q/B5doHYQcKDxm0YsOynPA/pao-frances.jpeg',
    },
    {
      id: 2,
      nome: 'Pão de Queijo',
      descricao: 'Unidade de pão de queijo quentinho e crocante',
      preco: 1.0,
      categoria: 'Pães',
      imagem: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT72_HdETtIyypzEJVgaPWZLVgppfM3ZHQVNlVw6odza8j_92-QaYQNLjClh_2MzxR0NqhK',
    },
    {
      id: 3,
      nome: 'Bolo de Cenoura',
      descricao: 'Fatia de bolo de cenoura com cobertura de chocolate',
      preco: 5.0,
      categoria: 'Doces',
      imagem: 'https://i.ytimg.com/vi/L1czIgvo3-I/maxresdefault.jpg',
    },
    {
      id: 4,
      nome: 'Bolo de Chocolate',
      descricao: 'Fatia de Bolo de chocolate com cobertura de chocolate',
      preco: 5.0,
      categoria: 'Doces',
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3zaXkuP720aNAu-sn7UU1p71XaTlGGMCf5A&s',
    },
    {
      id: 5,
      nome: 'Torta de Limão',
      descricao: 'Fatia de Torta de limão com merengue',
      preco: 5.0,
      categoria: 'Doces',
      imagem: 'https://recipesblob.oetker.com.br/assets/d044a4ef3cfe45998593f500c00942ef/1272x764/torta-de-limo.jpg',
    }
  ])
 })

//criação do endpoint do tipo post para cadastro

app.post('/cadastro', async (req, response) => {
  const { nome, senha, email, telefone } = req.body

  // Verifica se os campos estão preenchidos
  if (!nome) {
    return response
      .status(400)
      .json({ error: 'Nome é um campo obrigatório.' })
  }

  if (!senha) {
    return response
      .status(400)
      .json({ error: 'Senha é um campo obrigatório.' })
  }

  if (!email) {
    return response
      .status(400)
      .json({ error: 'Email é um campo obrigatório.' })
  }

  if (!telefone) {
    return response
      .status(400)
      .json({ error: 'Telefone é um campo obrigatório.' })
  }

  //trataviva de erro
try {

  // Alimenta o banco com os dados cadastrados
  const [results] = await queryBuilder.raw(`
    INSERT INTO usuario (nome, senha, email, telefone) VALUES (?, ?, ?, ?)
  `, [nome, senha, email, telefone])

  // Verifica se retornou algum resultado, caso contrário retorna erro

     response
      .status(201)
      .json({ insertId: results.insertId })

}
//trataviva de erro
catch{
  response
      .status(500)
      .json({ error: "Falha ao cadstrar usuário, verifique se todos os campos foram preenchidos." })

}
})

app.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}`)
  console.info(`Press Ctrl+C to stop the server`)
  console.info(`PID: ${process.pid}`)
})
