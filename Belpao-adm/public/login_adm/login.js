// Seleciona o formulário e a área de erro
const form = document.getElementById('adminLoginForm');
const erro = document.getElementById('erro');

// Adiciona evento de envio do formulário
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Impede o recarregamento da página

  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value.trim();

  // Verifica se os campos estão preenchidos
  if (!email || !senha) {
    erro.textContent = 'Preencha todos os campos.';
    return;
  }

  try {
    // Faz a requisição de login
    const resposta = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const dados = await resposta.json();

    if (resposta.ok && dados.usuario) {
      // Salva o ID do administrador no sessionStorage
      sessionStorage.setItem('usuario_id', dados.usuario.id);
      // Redireciona para a área de administração de produtos
      window.location.href = '/produtos/index.html';
    } else {
      // Exibe mensagem de erro vinda do backend
      erro.textContent = dados.mensagem || 'Credenciais inválidas.';
    }
  } catch (err) {
    erro.textContent = 'Erro ao conectar com o servidor.';
  }
});
