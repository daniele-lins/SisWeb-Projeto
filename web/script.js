const produtosPreCadastrados = [
    {
        nome: "Amigurumi de Joaninha Prendedor de Cortina",
        categoria: "Animais",
        preco: 30.00,
        imagem: "img/destaque1.jpg",
        unidadesCompradas: 10
    },
    {
        nome: "Amigurumi de Sol e Lua",
        categoria: "Criaturas",
        preco: 30.00,
        imagem: "img/destaque2.jpg",
        unidadesCompradas: 15
    },
    {
        nome: "Amigurumi de Personagem Mable Gravity Falls",
        categoria: "Personagens",
        preco: 40.00,
        imagem: "img/destaque3.jpg",
        unidadesCompradas: 20
    },
    {
        nome: "Amigurumi de Personagem do Sonic",
        categoria: "Personagens",
        preco: 40.00,
        imagem: "img/produto4.jpg",
        unidadesCompradas: 12
    },
    {
        nome: "Amigurumi de Água-viva",
        categoria: "Criaturas",
        preco: 20.00,
        imagem: "img/produto5.jpg",
        unidadesCompradas: 8
    },
    {
        nome: "Amigurumi de Polvo",
        categoria: "Animais",
        preco: 20.00,
        imagem: "img/produto6.jpg",
        unidadesCompradas: 5
    },
    {
        nome: "Amigurumi de Personagem Luffy One Piece",
        categoria: "Personagens",
        preco: 40.00,
        imagem: "img/produto7.jpg",
        unidadesCompradas: 18
    }
];

function renderProdutos(produtos) {
    const produtosList = document.getElementById("produtosList");
    produtosList.innerHTML = '';

    if (produtos.length === 0) {
        const mensagem = document.createElement('p');
        mensagem.textContent = "Em produção!";
        produtosList.appendChild(mensagem);
    } else {
        produtos.forEach(produto => {
            const divProduto = document.createElement('div');
            divProduto.classList.add('produto');
            divProduto.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p>R$ ${produto.preco.toFixed(2)}</p>
                <p>Quantidade comprada: ${produto.unidadesCompradas}</p>
                <button>Comprar</button>
            `;
            produtosList.appendChild(divProduto);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderProdutos(produtosPreCadastrados);
});


let currentSlide = 0;

function changeSlide(direction) {
    const slides = document.querySelectorAll(".slide");
    const totalSlides = slides.length;

    slides[currentSlide].style.display = "none";

    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

    slides[currentSlide].style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    slides.forEach((slide, index) => {
        slide.style.display = index === 0 ? "block" : "none";
    });

    renderProdutos(produtosPreCadastrados);
});

document.addEventListener("DOMContentLoaded", () => {
    renderProdutos(produtosPreCadastrados);

    document.getElementById("produtoForm").addEventListener("submit", (event) => {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const categoria = document.getElementById("categoria").value;
        const preco = parseFloat(document.getElementById("preco").value);
        const imagem = document.getElementById("imagem").files[0];

        const novoProduto = {
            nome: nome,
            categoria: categoria,
            preco: preco,
            imagem: URL.createObjectURL(imagem),
            unidadesCompradas: 0
        };

        produtosPreCadastrados.push(novoProduto);

        document.getElementById("produtoForm").reset();

        renderProdutos(produtosPreCadastrados);
    });
});

function filterCategory(categoria) {
    const produtosFiltrados = produtosPreCadastrados.filter(produto => produto.categoria === categoria);
    renderProdutos(produtosFiltrados);
}

function applyFilter() {
    const filtro = document.getElementById("filtroSelect").value;
    let produtosFiltrados = [...produtosPreCadastrados];

    if (filtro === 'popularidade') {
        produtosFiltrados.sort((a, b) => b.unidadesCompradas - a.unidadesCompradas);
    } else if (filtro === 'maiorpreco') {
        produtosFiltrados = [produtosFiltrados.reduce((a, b) => a.preco > b.preco ? a : b)];
    } else if (filtro === 'menorpreco') {
        produtosFiltrados = [produtosFiltrados.reduce((a, b) => a.preco < b.preco ? a : b)];
    } else if (filtro === 'maisnovos') {
        produtosFiltrados.sort((a, b) => b.dataAdicao - a.dataAdicao);
    } else if (filtro === 'maisvelhos') {
        produtosFiltrados.sort((a, b) => a.dataAdicao - b.dataAdicao);
    }

    renderProdutos(produtosFiltrados);
}

renderProdutos(produtos);
