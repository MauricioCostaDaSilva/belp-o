 const form = document.getElementById('adminLoginForm');
    const erro = document.getElementById('erro');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value.trim();
      const senha = document.getElementById('senha').value.trim();
      const botao = form.querySelector('button');

      if (!email || !senha) {
        erro.textContent = 'Preencha todos os campos.';
        return;
      }

      botao.disabled = true;
      botao.textContent = 'Entrando...';

      try {
        const resposta = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, senha })
        });

        const dados = await resposta.json();

        if (resposta.ok && dados.usuario) {
          sessionStorage.setItem('usuario_id', dados.usuario.id);
          window.location.href = '/produtos/produto.html';
        } else {
          erro.textContent = dados.mensagem || 'Credenciais inválidas.';
        }
      } catch (err) {
        erro.textContent = 'Erro ao conectar com o servidor.';
      } finally {
        botao.disabled = false;
        botao.textContent = 'Entrar';
      }
    });