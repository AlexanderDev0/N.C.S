document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".numberli");
  const duration = 1500; // duração da animação em ms (ajuste aqui)

  // Função de easing (easeOutCubic)
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateCounter(counter, target) {
    const start = performance.now();
    const originalHasPlus = counter.dataset.hasPlus === "true";

    function frame(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const value = Math.round(target * eased);

      counter.textContent = value + (originalHasPlus ? " +" : "");

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        // garante o valor final exato
        counter.textContent = target + (originalHasPlus ? " +" : "");
      }
    }

    requestAnimationFrame(frame);
  }

  // Prepara cada contador: determina target e se tem '+'
  counters.forEach(counter => {
    const rawText = counter.textContent.trim();
    const hasPlus = rawText.includes("+");
    counter.dataset.hasPlus = hasPlus ? "true" : "false";

    // Prioriza data-target se existir, caso contrário extrai dígitos do texto
    const dataTarget = counter.getAttribute("data-target");
    let target = dataTarget ? parseInt(dataTarget, 10) : null;

    if (!target || isNaN(target)) {
      const match = rawText.match(/\d+/); // pega o primeiro número encontrado
      target = match ? parseInt(match[0], 10) : 0;
    }

    // Zera visualmente antes de começar
    counter.textContent = "0" + (hasPlus ? " +" : "");

    // Guarda target para uso posterior
    counter.dataset.targetValue = target;
  });

  // Observer: inicia animação quando o contador entra na tela
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.targetValue, 10) || 0;

        animateCounter(el, target);
        obs.unobserve(el); // só roda uma vez
      }
    });
  }, {
    threshold: 0.5
  });

  counters.forEach(counter => observer.observe(counter));
});
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  const revealOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // roda uma vez
      }
    });
  };

  const observer = new IntersectionObserver(revealOnScroll, {
    threshold: 0.2, // quanto do elemento precisa aparecer pra começar
  });

  reveals.forEach(el => observer.observe(el));
});

// caroussel


