// js/include.js
// Comentários: carrega os partials header/footer e ajusta caminhos de links e imagens.
// Funciona tanto quando a página está na raiz (index.html) quanto dentro de pages/ (ex: pages/ptech.html).

async function fetchPartialTry(paths) {
  // recebe array de caminhos; retorna texto do primeiro que tiver ok
  for (const p of paths) {
    try {
      const res = await fetch(p);
      if (res.ok) return await res.text();
    } catch (e) {
      // ignora e tenta o próximo
    }
  }
  return null;
}

async function loadPartial(containerId, relativePath) {
  // tenta primeiro o caminho tal como está (útil para páginas na raiz)
  // e depois tenta "../" + relativePath (útil para páginas dentro de pages/)
  const html = await fetchPartialTry([relativePath, "../" + relativePath]);
  if (!html) return;

  document.getElementById(containerId).innerHTML = html;

  // Ajustar links com data-target dentro do partial carregado
  // Mapeia data-target para href adequado (diferente para root vs pages/)
  const inPagesFolder = location.pathname.includes("/pages/");
  document
    .querySelectorAll("#" + containerId + " [data-target]")
    .forEach((el) => {
      const target = el.getAttribute("data-target");
      let href = "#";

      if (inPagesFolder) {
        // páginas dentro de /pages/
        if (target === "home") href = "../index.html";
        else if (target === "ptech") href = "ptech.html";
        else if (target === "projects") href = "projects.html";
        else if (target === "about") href = "about.html";
        else href = target;
      } else {
        // páginas na raiz
        if (target === "home") href = "index.html";
        else if (target === "ptech") href = "pages/ptech.html";
        else if (target === "projects") href = "pages/projects.html";
        else if (target === "about") href = "pages/about.html";
        else href = target;
      }

      el.setAttribute("href", href);
    });

  // Ajustar imagens que usam data-src (para não duplicar caminhos)
  document
    .querySelectorAll("#" + containerId + " img[data-src]")
    .forEach((img) => {
      const src = img.getAttribute("data-src");
      const final = (inPagesFolder ? "../" : "") + src;
      img.setAttribute("src", final);
    });
}

// chama os dois partials
document.addEventListener("DOMContentLoaded", () => {
  // os IDs header e footer devem existir nas páginas (placeholders)
  if (document.getElementById("header"))
    loadPartial("header", "partials/header.html");
  if (document.getElementById("footer"))
    loadPartial("footer", "partials/footer.html");
});
