// js/main.js

document.addEventListener("DOMContentLoaded", () => {
  // 1. Script do Modal de Imagens (agora funciona em qualquer página)
  const zoomableImages = document.querySelectorAll(".zoomable");
  if (zoomableImages.length > 0) {
    const modal = new bootstrap.Modal(document.getElementById("imgModal"));
    const modalImage = document.getElementById("modalImage");
    let currentIndex = 0;

    const allImages = Array.from(zoomableImages);

    function showImage(index) {
      if (index >= 0 && index < allImages.length) {
        modalImage.src = allImages[index].src;
        currentIndex = index;
        modal.show();
      }
    }

    allImages.forEach((img, i) => {
      img.addEventListener("click", () => showImage(i));
    });

    document.getElementById("prevImg").addEventListener("click", () => {
      const newIndex = (currentIndex - 1 + allImages.length) % allImages.length;
      showImage(newIndex);
    });

    document.getElementById("nextImg").addEventListener("click", () => {
      const newIndex = (currentIndex + 1) % allImages.length;
      showImage(newIndex);
    });
  }

  // 2. Inicialização da Biblioteca de Animações (AOS)
  AOS.init({
    duration: 800, // Duração da animação em milissegundos
    once: true, // Animação acontece apenas uma vez
    offset: 50, // Ativa a animação um pouco antes do elemento aparecer
  });
});
