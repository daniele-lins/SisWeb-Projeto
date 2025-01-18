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
const produtos = [
    {
        nome: "Amigurumi de Joaninha Prendedor de Cortina",
        preco: 30,
        categoria: "animais",
        tags: ["animais"],
        unidadesCompradas: 200,
        dataAdicao: new Date("2024-01-01"),
        imagem: "img/destaque1.jpg"
    },
    {
        nome: "Amigurumi de Sol e Lua",
        preco: 30,
        categoria: "outros",
        tags: ["outros"],
        unidadesCompradas: 150,
        dataAdicao: new Date("2024-02-01"),
        imagem: "img/destaque2.jpg"
    },
    {
        nome: "Amigurumi de Personagem Mable Gravity Falls",
        preco: 40,
        categoria: "personagens",
        tags: ["personagens"],
        unidadesCompradas: 120,
        dataAdicao: new Date("2024-03-01"),
        imagem: "img/destaque3.jpg"
    },
    {
        nome: "Amigurumi de Personagem do Sonic",
        preco: 40,
        categoria: "personagens",
        tags: ["personagens"],
        unidadesCompradas: 80,
        dataAdicao: new Date("2024-04-01"),
        imagem: "img/produto4.jpg"
    },
    {
        nome: "Amigurumi de Água-viva",
        preco: 20,
        categoria: "animais",
        tags: ["animais"],
        unidadesCompradas: 30,
        dataAdicao: new Date("2024-05-01"),
        imagem: "img/produto5.jpg"
    },
    {
        nome: "Amigurumi de Polvo",
        preco: 20,
        categoria: "animais",
        tags: ["animais"],
        unidadesCompradas: 60,
        dataAdicao: new Date("2024-06-01"),
        imagem: "img/produto6.jpg"
    },
    {
        nome: "Amigurumi de Personagem Luffy One Piece",
        preco: 40,
        categoria: "personagens",
        tags: ["personagens"],
        unidadesCompradas: 50,
        dataAdicao: new Date("2024-07-01"),
        imagem: "img/produto7.jpg"
    }
];

// Função para renderizar os produtos
function renderProdutos(produtosFiltrados) {
    const produtosList = document.getElementById("produtosList");
    produtosList.innerHTML = ''; // Limpar produtos antes de renderizar

    if (produtosFiltrados.length === 0) {
        // Exibir mensagem de "Em produção!" se não houver produtos
        const mensagem = document.createElement('p');
        mensagem.textContent = "Em produção!";
        produtosList.appendChild(mensagem);
    } else {
        // Renderizar os produtos normalmente
        produtosFiltrados.forEach(produto => {
            const divProduto = document.createElement('div');
            divProduto.classList.add('produto');
            divProduto.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p>R$ ${produto.preco}</p>
                <p>Quantidade comprada: ${produto.unidadesCompradas}</p>
                <button>Comprar</button>
            `;
            produtosList.appendChild(divProduto);
        });
    }
}

// Filtro de categorias
function filterCategory(categoria) {
    const produtosFiltrados = produtos.filter(produto => produto.categoria === categoria);
    renderProdutos(produtosFiltrados);
}

// Asegura que a função de renderização será chamada quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    renderProdutos(produtos); // Exibir todos os produtos ao carregar a página
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
