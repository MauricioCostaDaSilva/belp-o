document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-produto');
    const listaProdutos = document.getElementById('lista-produtos');
    const cancelarEdicaoBtn = document.getElementById('cancelar-edicao'); // Obtenha o botão de cancelar

    let produtoEditandoId = null; // id do produto em edição

    // Oculta o botão de cancelar inicialmente
    cancelarEdicaoBtn.style.display = 'none';

    listarProdutos();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            let resposta;

            if (produtoEditandoId) {
                // Se estiver editando, usa o método PUT
                resposta = await fetch(`/api/produtos/${produtoEditandoId}`, {
                    method: 'PUT',
                    body: formData,
                });
            } else {
                // Se não estiver editando, usa o método POST para cadastrar
                resposta = await fetch('/api/produtos', {
                    method: 'POST',
                    body: formData,
                });
            }

            const resultado = await resposta.json();

            if (resposta.ok) {
                alert(produtoEditandoId ? 'Produto atualizado com sucesso!' : 'Produto cadastrado com sucesso!');
                form.reset(); // Limpa o formulário
                produtoEditandoId = null; // Reseta o ID de edição
                cancelarEdicaoBtn.style.display = 'none'; // Esconde o botão após salvar/atualizar
                listarProdutos(); // Atualiza a lista de produtos
            } else {
                alert('Erro: ' + resultado.erro);
            }
        } catch (error) {
            console.error('Erro na submissão do formulário:', error);
            alert('Ocorreu um erro ao processar sua solicitação.');
        }
    });

    async function listarProdutos() {
        listaProdutos.innerHTML = ''; // Limpa a lista antes de preencher
        try {
            const resposta = await fetch('/api/produtos');
            const produtos = await resposta.json();

            if (produtos.length === 0) {
                listaProdutos.innerHTML = '<p style="text-align: center; color: #5e3c24;">Nenhum produto cadastrado.</p>';
                return;
            }

            produtos.forEach((produto) => {
                const item = document.createElement('li');

                item.innerHTML = `
                    ${produto.imagem ? `<img class="produto-img" src="${produto.imagem}" alt="${produto.nome}">` : ''}
                    <div class="produto-info">
                        <p><strong>Categoria:</strong> ${produto.categoria}</p>
                        <p><strong>Nome:</strong> ${produto.nome}</p>
                        <p><strong>Preço:</strong> R$ ${parseFloat(produto.preco).toFixed(2).replace('.', ',')}</p>
                        <p><strong>Descrição:</strong><br>${produto.descricao}</p>
                    </div>
                    <div class="botoes">
                        <button class="editar" onclick="editarProduto(${produto.id})">Editar</button>
                        <button class="remover" onclick="excluirProduto(${produto.id})">Excluir</button>
                    </div>
                `;
                listaProdutos.appendChild(item);
            });
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            listaProdutos.innerHTML = '<p style="text-align: center; color: red;">Erro ao carregar produtos.</p>';
        }
    }

    // Função global para excluir produto
    window.excluirProduto = async (id) => {
        if (confirm('Tem certeza que deseja excluir este produto?')) {
            try {
                const resposta = await fetch(`/api/produtos/${id}`, {
                    method: 'DELETE',
                });

                const resultado = await resposta.json();

                if (resposta.ok) {
                    alert('Produto excluído com sucesso!');
                    listarProdutos(); // Atualiza a lista após exclusão
                } else {
                    alert('Erro ao excluir: ' + resultado.erro);
                }
            } catch (error) {
                console.error('Erro ao excluir:', error);
                alert('Ocorreu um erro ao tentar excluir o produto.');
            }
        }
    };

    // Função global para editar produto
    window.editarProduto = async (id) => {
        try {
            const resposta = await fetch(`/api/produtos/${id}`);
            if (!resposta.ok) {
                alert('Erro ao buscar produto para edição');
                return;
            }
            const produto = await resposta.json();

            // Preenche o formulário com os dados do produto
            form.categoria.value = produto.categoria;
            form.nome.value = produto.nome;
            form.descricao.value = produto.descricao;
            form.preco.value = produto.preco; // Use 'preco' aqui, não 'valor' se o name for 'preco'

            produtoEditandoId = produto.id; // Define o ID do produto que está sendo editado
            cancelarEdicaoBtn.style.display = 'block'; // Mostra o botão de cancelar ao entrar em modo de edição
        } catch (error) {
            console.error('Erro ao buscar produto para edição:', error);
            alert('Ocorreu um erro ao carregar os dados do produto para edição.');
        }
    };

    // Evento de clique para o botão de cancelar edição
    cancelarEdicaoBtn.addEventListener('click', () => {
        form.reset(); // Limpa o formulário
        produtoEditandoId = null; // Reseta o ID de edição
        cancelarEdicaoBtn.style.display = 'none'; // Esconde o botão ao cancelar
    });
});