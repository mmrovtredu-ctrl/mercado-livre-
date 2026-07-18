/* =========================================================
   VITRINE ALIEXPRESS — walker.js
   Carrinho de compras que atravessa a tela conforme o scroll.
   Usa anime.js (v4) para a animação e mapeia o progresso do
   scroll do documento direto no progresso do passeio (seek),
   garantindo travessia completa e suave também no toque do
   celular. Padrão inspirado nos exemplos onScroll do anime.js.
   ========================================================= */
"use strict";

(function initWalker() {
  const walker = document.getElementById("walker");
  if (!walker) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    walker.remove(); // sem movimento: remove para não distrair
    return;
  }

  const distance = () => window.innerWidth + walker.offsetWidth + 60;
  const DURATION = 1000; // referência interna; o tempo real é o scroll

  /* ---------- Animação da travessia (anime.js) ---------- */
  const hasAnime = typeof window.anime !== "undefined" && window.anime.animate;
  let seek = null;

  if (hasAnime) {
    const anim = window.anime.animate(walker, {
      x: `${distance()}px`,
      ease: "linear",
      duration: DURATION,
      autoplay: false,
    });
    seek = (progress) => anim.seek(progress * DURATION);
  } else {
    // Fallback sem biblioteca: mesmo efeito com transform direto
    seek = (progress) => {
      walker.style.transform = `translateX(${progress * distance()}px)`;
    };
  }

  /* ---------- Progresso do scroll → progresso do passeio ---------- */
  let ticking = false;
  let stopTimeout = null;

  const update = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const progress = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
    seek(progress);
    ticking = false;
  };

  const onScrollPage = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
    // Patinhas mexem só enquanto rola
    walker.classList.add("is-walking");
    clearTimeout(stopTimeout);
    stopTimeout = setTimeout(() => walker.classList.remove("is-walking"), 160);
  };

  window.addEventListener("scroll", onScrollPage, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  update();
})();
