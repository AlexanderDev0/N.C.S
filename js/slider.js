const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

const scrollAmount = 300; // quanto rolar por clique (px) — ajuste conforme necessidade

prevBtn.addEventListener('click', () => {
  carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});

nextBtn.addEventListener('click', () => {
  carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});

/* Opcional: scroll automático suave (auto-play), pausando no hover */
let autoPlay = true;
let speed = 1; // pixels por frame
let rafId;

function autoScroll() {
  if (!autoPlay) return;
  carousel.scrollLeft += speed;
  // loop manual: volta ao começo quando chega ao fim
  if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
    carousel.scrollLeft = 0;
  }
  rafId = requestAnimationFrame(autoScroll);
}

carousel.addEventListener('mouseenter', () => { autoPlay = false; cancelAnimationFrame(rafId); });
carousel.addEventListener('mouseleave', () => { if (!rafId) { autoPlay = true; autoScroll(); } });

autoScroll();
