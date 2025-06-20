document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-produto");
  const lista = document.getElementById("lista-produtos");
  const cancelarEdicaoBtn = document.getElementById("cancelar-edicao");
  let produtoEditando = null;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const usuario_id = sessionStorage.getItem("usuario_id");

    if (!usuario_id) {
      alert("Usuário não autenticado.");
      return;
    }

    const formData = new FormData(form);
    formData.append("usuario_id", usuario_id);

    const url = produtoEditando ? `/api/produtos/${produtoEditando}` : "/api/produtos";
    const method = produtoEditando ? "PUT" : "POST";

    try {
      const res = await fetch(url, { method, body: formData });
      if (!res.ok) throw new Error("Erro ao salvar produto");

      form.reset();
      produtoEditando = null;
      cancelarEdicaoBtn.style.display = "none";
      form.querySelector("button[type='submit']").textContent = "Cadastrar Produto";
      carregarProdutos();
    } catch (error) {
      alert("Erro ao salvar produto.");
      console.error(error);
    }
  });

  cancelarEdicaoBtn.addEventListener("click", () => {
    form.reset();
    produtoEditando = null;
    cancelarEdicaoBtn.style.display = "none";
    form.querySelector("button[type='submit']").textContent = "Cadastrar Produto";
  });

  async function carregarProdutos() {
    try {
      const res = await fetch("/api/produtos");
      const produtos = await res.json();
      lista.innerHTML = "";

      produtos.forEach(prod => {
        const item = document.createElement("li");
        item.innerHTML = `
          ${prod.imagem ? `<img src="${prod.imagem}" alt="Imagem do produto">` : ""}
          <div class="produto-info">
            <p><strong>Categoria:</strong> ${prod.categoria}</p>
            <p><strong>Nome:</strong> ${prod.nome}</p>
            <p><strong>Valor:</strong> R$ ${parseFloat(prod.valor).toFixed(2)}</p>
            <p><strong>Descrição:</strong><br>${prod.descricao}</p>
          </div>
          <div class="botoes">
            <button class="editar" data-id="${prod.id}">Editar</button>
            <button class="remover" data-id="${prod.id}">Remover</button>
          </div>
        `;
        lista.appendChild(item);
      });

      // Adiciona eventos aos botões
      lista.querySelectorAll(".editar").forEach(botao => {
        botao.addEventListener("click", async () => {
          const id = botao.dataset.id;
          const res = await fetch(`/api/produtos/${id}`);
          const produto = await res.json();

          document.getElementById("nome").value = produto.nome;
          document.getElementById("categoria").value = produto.categoria;
          document.getElementById("descricao").value = produto.descricao;
          document.getElementById("valor").value = produto.valor;

          produtoEditando = id;
          cancelarEdicaoBtn.style.display = "inline-block";
          form.querySelector("button[type='submit']").textContent = "Atualizar Produto";
        });
      });

      lista.querySelectorAll(".remover").forEach(botao => {
        botao.addEventListener("click", async () => {
          const id = botao.dataset.id;
          const confirmar = confirm("Tem certeza que deseja remover este produto?");
          if (!confirmar) return;

          try {
            const res = await fetch(`/api/produtos/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Erro ao remover produto");
            carregarProdutos();
          } catch (error) {
            alert("Erro ao remover produto.");
            console.error(error);
          }
        });
      });

    } catch {
      alert("Erro ao carregar produtos.");
    }
  }

  carregarProdutos();
});
