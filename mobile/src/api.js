// Endereços base da API
const baseURL = new URL("http://192.168.200.18:3000")
export const admWEB = new URL("http://192.168.200.18:3001")

/**
 * Função genérica para requisições HTTP
 * @param {string} path Caminho da API (ex: "/token")
 * @param {string} method Método HTTP (ex: "POST")
 * @param {Object} body Corpo da requisição em JSON
 * @param {number} expectedStatus Código esperado da resposta (ex: 200 ou 201)
 */
async function makeRequest(path, method, body, expectedStatus = 200) {
  const url = new URL(path, baseURL)

  const requestOptions = {
    method,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }

  const response = await fetch(url, requestOptions)

  if (response.status !== expectedStatus) {
    throw new Error(`Erro na requisição para ${path} (status ${response.status})`)
  }

  return await response.json()
}

/**
 * Obtém o token de autenticação do usuário
 * @param {string} username
 * @param {string} password
 */
export async function getToken(username, password) {
  return makeRequest("/token", "POST", { username, password }, 200)
}

/**
 * Cadastra um novo usuário
 * @param {string} nome
 * @param {string} senha
 * @param {string} email
 * @param {string} telefone
 */
export async function cadastro(nome, senha, email, telefone) {
  return makeRequest("/cadastro", "POST", { nome, senha, email, telefone }, 201)
}

/**
 * Retorna a lista de produtos disponíveis
 */
export async function getProdutos() {
  return Promise.resolve([
    {
      id: 1,
      nome: 'Pão Francês',
      descricao: 'Unidade de pão francês quentinho e crocante',
      preco: 0.80,
      categoria: 'Pães',
      imagem: 'https://s2-receitas.glbimg.com/-V4nFrbjz9JMuWJnvQxl2NEplg8=/0x0:1280x922/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2020/U/q/B5doHYQcKDxm0YsOynPA/pao-frances.jpeg',
    },
    {
      id: 2,
      nome: 'Pão de Queijo',
      descricao: 'Unidade de pão de queijo quentinho e crocante',
      preco: 2.50,
      categoria: 'Pães',
      imagem: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT72_HdETtIyypzEJVgaPWZLVgppfM3ZHQVNlVw6odza8j_92-QaYQNLjClh_2MzxR0NqhK',
    },
    {
      id: 3,
      nome: 'Croissant de Presunto e Queijo',
      descricao: 'Croissant folhado recheado com presunto e queijo',
      preco: 7.50,
      categoria: 'Salgados',
      imagem: 'https://i0.wp.com/anamariabraga.globo.com/wp-content/uploads/2016/06/croissant-de-presunto-e-queijo-do-expert-em-paes-benjamin-abrahao-6670.jpg?fit=630%2C630&ssl=1',
    },
    {
      id: 4,
      nome: 'Empada de Frango',
      descricao: 'Empada artesanal de frango temperado',
      preco: 5.00,
      categoria: 'Salgados',
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFyvKruANot-23-yJlTIJso8q4HtkweawKcg&s',
    },
    {
      id: 5,
      nome: 'Esfiha de Carne',
      descricao: 'Esfiha aberta recheada com carne temperada',
      preco: 4.50,
      categoria: 'Salgados',
      imagem: 'https://www.minhareceita.com.br/app/uploads/2024/12/esfihas-de-carne-portal-minha-receita.webp',
    },
    {
      id: 6,
      nome: 'Coxinha de Frango',
      descricao: 'Coxinha crocante recheada com frango e catupiry',
      preco: 6.00,
      categoria: 'Salgados',
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGB13GJVlJ3mi2V1IbJEgJZo8LUMFJoaAPxQ&s',
    },
    {
      id: 7,
      nome: 'Bolo de Cenoura',
      descricao: 'Fatia de bolo de cenoura com cobertura de chocolate',
      preco: 6.00,
      categoria: 'Doces',
      imagem: 'https://i.ytimg.com/vi/L1czIgvo3-I/maxresdefault.jpg',
    },
    {
      id: 8,
      nome: 'Bolo de Chocolate',
      descricao: 'Fatia de bolo de chocolate com cobertura de chocolate',
      preco: 6.50,
      categoria: 'Doces',
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3zaXkuP720aNAu-sn7UU1p71XaTlGGMCf5A&s',
    },
    {
      id: 9,
      nome: 'Torta de Limão',
      descricao: 'Fatia de torta de limão com merengue',
      preco: 7.00,
      categoria: 'Doces',
      imagem: 'https://recipesblob.oetker.com.br/assets/d044a4ef3cfe45998593f500c00942ef/1272x764/torta-de-limo.jpg',
    },
    {
      id: 10,
      nome: 'Brigadeiro',
      descricao: 'Unidade de brigadeiro artesanal',
      preco: 2.00,
      categoria: 'Doces',
      imagem: 'https://panelinhagrill.com.br/wp-content/uploads/2025/02/Brigadeiro-Gourmet-perfeito-veja-como-fazer-esse-brigadeiro.webp',
    },
    {
      id: 11,
      nome: 'Beijinho',
      descricao: 'Unidade de beijinho de coco',
      preco: 2.00,
      categoria: 'Doces',
      imagem: 'https://receitacerta.blog.br/wp-content/uploads/2024/07/beijinho-jpg.webp',
    },
    {
      id: 12,
      nome: 'Café Preto',
      descricao: 'Café coado forte e quente (200ml)',
      preco: 3.00,
      categoria: 'Bebidas',
      imagem: 'https://tomandocafe.com.br/uploads/568/blog/02.jpg',
    },
    {
      id: 13,
      nome: 'Cappuccino',
      descricao: 'Cappuccino cremoso com canela (200ml)',
      preco: 6.00,
      categoria: 'Bebidas',
      imagem: 'https://lorcoffee.com/cdn/shop/articles/Cappuccino-exc.jpg?v=1684870907',
    },
    {
      id: 14,
      nome: 'Suco Natural de Laranja',
      descricao: 'Suco natural de laranja gelado (300ml)',
      preco: 5.50,
      categoria: 'Bebidas',
      imagem: 'https://image.tuasaude.com/media/article/go/jh/suco-de-laranja_67324.jpg',
    },
    {
      id: 15,
      nome: 'Água Mineral',
      descricao: 'Garrafa de água mineral (500ml)',
      preco: 2.50,
      categoria: 'Bebidas',
      imagem: 'https://andinacocacola.vtexassets.com/arquivos/ids/157883-800-450?v=638412015595530000&width=800&height=450&aspect=true',
    }
  ])
}
