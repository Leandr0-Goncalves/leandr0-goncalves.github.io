// js/include.js

document.addEventListener("DOMContentLoaded", () => {
  // Define os caminhos para os arquivos parciais
  const headerPath = "partials/header.html";
  const footerPath = "partials/footer.html";

  // Determina o caminho base (prefixo) dependendo se a página está na pasta 'pages'
  const isSubpage = window.location.pathname.includes("/pages/");
  const basePath = isSubpage ? ".." : ".";

  // Função para carregar e injetar o conteúdo HTML
  const loadHTML = (elementId, filePath) => {
    fetch(`${basePath}/${filePath}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Não foi possível carregar ${filePath}`);
        }
        return response.text();
      })
      .then((data) => {
        const element = document.getElementById(elementId);
        if (element) {
          element.innerHTML = data;
          // Após carregar o header, processa os links e imagens
          if (elementId === "header") {
            processHeaderPaths(element);
          }
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar HTML parcial:", error);
        // Exibe um erro na página para facilitar a depuração
        const element = document.getElementById(elementId);
        if (element)
          element.innerHTML = `<p class="text-danger text-center">Erro ao carregar o ${elementId}. Verifique o console.</p>`;
      });
  };

  // Carrega o cabeçalho e o rodapé
  loadHTML("header", headerPath);
  loadHTML("footer", footerPath);

  // Função para corrigir os caminhos dentro do header carregado
  const processHeaderPaths = (headerElement) => {
    const links = headerElement.querySelectorAll("a[data-target]");
    const images = headerElement.querySelectorAll("img[data-src]");

    // Mapeamento dos alvos dos links para os caminhos reais
    const pathMap = {
      home: "index.html",
      ptech: "pages/ptech.html",
      projects: "pages/projects.html",
      about: "pages/about.html",
    };

    // Corrige os links de navegação
    links.forEach((link) => {
      const target = link.dataset.target;
      if (pathMap[target]) {
        link.href = `${basePath}/${pathMap[target]}`;
        // Adiciona a classe 'active' se o link corresponder à página atual
        if (window.location.pathname.includes(pathMap[target])) {
          link.classList.add("active");
        }
      }
    });

    // Corrige os caminhos das imagens
    images.forEach((img) => {
      const src = img.dataset.src;
      if (src) {
        img.src = `${basePath}/${src}`;
      }
    });
  };
});
