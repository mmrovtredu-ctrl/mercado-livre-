/* =========================================================
   VITRINE DE AFILIADOS ALIEXPRESS — main.js
   Lógica de render, filtros e busca.
   ⚠️ Para adicionar produtos, edite js/produtos.js — não este arquivo.
   ========================================================= */
"use strict";

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

document.documentElement.classList.add("js");

/* ---------- Estado ---------- */
const estado = { categoria: "todos", sub: null, busca: "" };

/* ---------- Perfil (link na bio) ---------- */
(function initPerfil() {
  if (typeof PERFIL === "undefined") return;
  const set = (id, prop, valor) => {
    const el = document.getElementById(id);
    if (el && valor) el[prop] = valor;
  };
  set("perfilNome", "textContent", PERFIL.nome);
  set("brandName", "textContent", PERFIL.nome);
  set("brandNameFooter", "textContent", PERFIL.nome);
  set("perfilBio", "textContent", PERFIL.bio);
  set("heroLoja", "href", PERFIL.loja);
  set("headerLoja", "href", PERFIL.loja);
  set("heroInsta", "href", PERFIL.instagram);
  set("footerInsta", "href", PERFIL.instagram);
  set("footerIgLabel", "textContent", PERFIL.instagramLabel);
  document.title = `${PERFIL.nome} — Meus achados no AliExpress`;
})();

/* ---------- Validação dos links de afiliado ----------
   Avisa no console se algum produto estiver com link SEM rastreio.
   Link sem código de afiliado = venda sem comissão. */
(function checarLinks() {
  if (typeof PRODUTOS === "undefined") return;
  const ehAfiliado = (url) =>
    /(^https:\/\/s\.click\.aliexpress\.com\/)|(^https:\/\/star\.aliexpress\.com\/)|([?&](aff_fcid|aff_trace_key|aff_platform|afSmartRedirect)=)/i.test(url);

  const semRastreio = PRODUTOS.filter((p) => !ehAfiliado(p.link));
  if (semRastreio.length) {
    console.warn(
      `⚠️ ${semRastreio.length} produto(s) com link SEM código de afiliado — essas vendas NÃO geram comissão:\n` +
        semRastreio.map((p) => `   • ${p.titulo}`).join("\n") +
        `\n👉 Gere o link no portal de afiliados (portals.aliexpress.com → Link Generator) e cole em js/produtos.js.`
    );
  }
})();

/* ---------- Render dos filtros ---------- */
(function renderFiltros() {
  const wrap = $("#filtros");
  if (!wrap || typeof CATEGORIAS === "undefined") return;

  const criar = (id, nome, emoji, selecionado) => {
    const btn = document.createElement("button");
    btn.className = "filter";
    btn.type = "button";
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", String(selecionado));
    btn.dataset.cat = id;
    btn.textContent = emoji ? `${emoji} ${nome}` : nome;
    return btn;
  };

  wrap.appendChild(criar("todos", "Todos", "✨", true));
  CATEGORIAS.forEach((c) => wrap.appendChild(criar(c.id, c.nome, c.emoji, false)));

  wrap.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    estado.categoria = btn.dataset.cat;
    estado.sub = null;
    $$(".filter", wrap).forEach((b) =>
      b.setAttribute("aria-selected", String(b === btn))
    );
    renderSubfiltros();
    renderProdutos();
  });
})();

/* ---------- Subfiltros (aparecem só se a categoria tiver) ---------- */
function renderSubfiltros() {
  const wrap = $("#subfiltros");
  if (!wrap) return;
  wrap.innerHTML = "";

  const cat = CATEGORIAS.find((c) => c.id === estado.categoria);
  if (!cat || !cat.subs || !cat.subs.length) {
    wrap.hidden = true;
    return;
  }

  wrap.hidden = false;
  const criar = (id, nome, selecionado) => {
    const btn = document.createElement("button");
    btn.className = "subfilter";
    btn.type = "button";
    btn.setAttribute("aria-selected", String(selecionado));
    btn.dataset.sub = id;
    btn.textContent = nome;
    return btn;
  };

  wrap.appendChild(criar("", "Tudo de " + cat.nome, true));
  cat.subs.forEach((s) => wrap.appendChild(criar(s.id, s.nome, false)));
}

/* Listener dos subfiltros registrado UMA vez (delegação).
   Registrar dentro de renderSubfiltros acumularia um listener por troca de filtro. */
(function bindSubfiltros() {
  const wrap = $("#subfiltros");
  if (!wrap) return;
  wrap.addEventListener("click", (e) => {
    const btn = e.target.closest(".subfilter");
    if (!btn) return;
    estado.sub = btn.dataset.sub || null;
    $$(".subfilter", wrap).forEach((b) =>
      b.setAttribute("aria-selected", String(b === btn))
    );
    renderProdutos();
  });
})();

/* ---------- Render dos produtos ---------- */
function filtrar() {
  const termo = estado.busca.trim().toLowerCase();
  return PRODUTOS.filter((p) => {
    const okCat = estado.categoria === "todos" || p.categoria === estado.categoria;
    const okSub = !estado.sub || p.sub === estado.sub;
    const okBusca =
      !termo ||
      `${p.titulo} ${p.subtitulo || ""} ${p.nota || ""}`.toLowerCase().includes(termo);
    return okCat && okSub && okBusca;
  });
}

function renderProdutos() {
  const grade = $("#grade");
  const vazio = $("#vazio");
  const contador = $("#contador");
  if (!grade) return;

  const lista = filtrar();
  grade.innerHTML = "";

  contador.textContent = lista.length
    ? `${lista.length} ${lista.length === 1 ? "produto" : "produtos"}`
    : "";
  vazio.hidden = lista.length > 0;

  lista.forEach((p) => {
    const card = document.createElement("a");
    card.className = "card";
    card.href = p.link;
    card.target = "_blank";
    // sponsored: sinaliza link pago ao Google (exigência de SEO para afiliados)
    card.rel = "noopener sponsored nofollow";
    card.innerHTML = `
      <div class="card__media">
        ${p.tag ? `<span class="card__tag">${p.tag}</span>` : ""}
        <img src="${p.imagem}" alt="${p.titulo}" loading="lazy" width="600" height="600">
      </div>
      <div class="card__body">
        <span class="card__title">${p.titulo}</span>
        ${p.subtitulo ? `<p class="card__sub">${p.subtitulo}</p>` : ""}
        ${p.nota ? `<p class="card__note">💬 ${p.nota}</p>` : ""}
        <span class="card__cta">Ver no AliExpress →</span>
      </div>
    `;
    grade.appendChild(card);
  });

  animarEntrada();
}

/* ---------- Animação de entrada em cascata (anime.js) ---------- */
function animarEntrada() {
  const cards = $$(".card");
  if (!cards.length) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const temAnime = typeof window.anime !== "undefined" && window.anime.animate;

  if (reduced || !temAnime) {
    cards.forEach((c) => (c.style.opacity = "1"));
    return;
  }

  window.anime.animate(cards, {
    opacity: [0, 1],
    translateY: [16, 0],
    scale: [0.96, 1],
    duration: 420,
    delay: window.anime.stagger(45),
    ease: "outCubic",
  });
}

/* ---------- Busca (com debounce) ---------- */
(function initBusca() {
  const input = $("#busca");
  if (!input) return;
  let t = null;
  input.addEventListener("input", () => {
    clearTimeout(t);
    t = setTimeout(() => {
      estado.busca = input.value;
      renderProdutos();
    }, 180);
  });
})();

/* ---------- Letras flutuantes no nome do perfil ---------- */
(function initFloatingLetters() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let i = 0;
  $$(".float-text").forEach((chunk) => {
    const texto = chunk.textContent;
    chunk.setAttribute("aria-label", texto);
    chunk.textContent = "";
    [...texto].forEach((ch) => {
      if (ch === " ") {
        chunk.appendChild(document.createTextNode(" "));
        return;
      }
      const span = document.createElement("span");
      span.className = "ltr";
      span.setAttribute("aria-hidden", "true");
      span.style.setProperty("--i", i++);
      span.textContent = ch;
      chunk.appendChild(span);
    });
  });
})();

/* ---------- Ano do rodapé ---------- */
(function setAno() {
  const el = $("#ano");
  if (el) el.textContent = new Date().getFullYear();
})();

/* ---------- Inicialização ---------- */
renderSubfiltros();
renderProdutos();
