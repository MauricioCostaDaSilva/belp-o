// deve informar o endereço correto do servidor
const baseURL = new URL("http://192.168.200.14:3000")

/**
 * Função para obter o token de autenticação do usuário
 *
 * @param {string} username
 * @param {string} password
 */
export async function getToken (username, password) {
  const requestOptions = {
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  }

  baseURL.pathname = "/token"

  const response = await fetch(baseURL, requestOptions)

  if (!response.ok) {
    return Promise.reject(new Error("Erro ao obter o token de autenticação"))
  }

  return await response.json()
}

export async function getProdutos () {
  return Promise.resolve([
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
}
