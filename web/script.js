let currentSlide = 0;

function changeSlide(direction) {
    const slides = document.querySelectorAll(".slide");
    const totalSlides = slides.length;

    // Oculta o slide atual
    slides[currentSlide].style.display = "none";

    // Atualiza o índice do slide
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

    // Exibe o próximo slide
    slides[currentSlide].style.display = "block";
}

// Inicializa o carrossel mostrando o primeiro slide
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    slides.forEach((slide, index) => {
        slide.style.display = index === 0 ? "block" : "none";
    });
});

// Dados dos produtos com tags, preço e quantidade comprada
document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://localhost:8080/api/produtos";
    
    async function carregarProdutos() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error("Erro ao buscar produtos");
            
            const produtos = await response.json();
            exibirProdutos(produtos);
        } catch (error) {
            console.error("Erro:", error);
            document.getElementById("produtosList").innerHTML = "Erro ao carregar produtos.";
        }
    }

    function exibirProdutos(produtos) {
        const container = document.getElementById("produtosList");
        container.innerHTML = "";
        
        produtos.forEach(produto => {
            const produtoDiv = document.createElement("div");
            produtoDiv.classList.add("produto");
            produtoDiv.innerHTML = `
                <h3>${produto.nome}</h3>
                <p>Categoria: ${produto.categoria}</p>
                <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
            `;
            container.appendChild(produtoDiv);
        });
    }

    document.getElementById("produtoForm").addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const nome = document.getElementById("nome").value;
        const categoria = document.getElementById("categoria").value;
        const preco = parseFloat(document.getElementById("preco").value);
        
        const novoProduto = { nome, categoria, preco };
        
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(novoProduto),
            });
            
            if (!response.ok) throw new Error("Erro ao adicionar produto");
            
            document.getElementById("produtoForm").reset();
            carregarProdutos();
        } catch (error) {
            console.error("Erro:", error);
        }
    });

    carregarProdutos();
});

// Função para aplicar filtro de popularidade
function applyFilter() {
    const filtro = document.getElementById("filtroSelect").value;
    let produtosFiltrados = [...produtos]; // Copiar a lista original de produtos

    if (filtro === 'popularidade') {
        produtosFiltrados.sort((a, b) => b.unidadesCompradas - a.unidadesCompradas);
    } else if (filtro === 'maiorpreco') {
        produtosFiltrados.sort((a, b) => b.preco - a.preco);
    } else if (filtro === 'menorpreco') {
        produtosFiltrados.sort((a, b) => a.preco - b.preco);
    } else if (filtro === 'maisnovos') {
        produtosFiltrados.sort((a, b) => b.dataAdicao - a.dataAdicao);
    } else if (filtro === 'maisvelhos') {
        produtosFiltrados.sort((a, b) => a.dataAdicao - b.dataAdicao);
    }

    renderProdutos(produtosFiltrados);
}

// Exibir todos os produtos por padrão ao carregar a página
renderProdutos(produtos);
