/* =========================================================
   ⭐ ESTE É O ÚNICO ARQUIVO QUE VOCÊ PRECISA EDITAR ⭐

   Para adicionar um produto novo:
   1. Gere o link de afiliado no portal do AliExpress
      (portals.aliexpress.com → Ad Center → Link Generator → cole a URL).
      O link sai parecido com: https://s.click.aliexpress.com/e/_XXXXXX
   2. Salve a foto do produto em assets/produtos/.
   3. Copie um bloco abaixo, cole no topo da lista e edite.
   4. Salve → commit no GitHub → a Vercel publica sozinha.

   ⚠️ IMPORTANTE: use SEMPRE o link gerado no portal de afiliados.
   Link normal de produto (pt.aliexpress.com/item/...) NÃO paga comissão.
   O site avisa no console do navegador se algum link não estiver rastreado.
   ========================================================= */
"use strict";

/* ---------- CATEGORIAS E FILTROS ----------
   Para criar uma categoria nova, adicione um objeto aqui.
   "subs" é opcional (só use se a categoria tiver subfiltros). */
const CATEGORIAS = [
  {
    id: "pesca",
    nome: "Pesca",
    emoji: "🎣",
    subs: [
      { id: "acessorios", nome: "Acessórios" },
      { id: "roupas", nome: "Roupas" },
      { id: "iscas", nome: "Iscas" },
    ],
  },
  { id: "livros", nome: "Livros", emoji: "📚" },
  { id: "cozinha", nome: "Cozinha", emoji: "🍳" },
];

/* ---------- PRODUTOS ----------
   Campos:
   id        → identificador único (sem espaços)
   titulo    → nome do produto
   subtitulo → linha de apoio (opcional)
   categoria → precisa bater com um "id" de CATEGORIAS
   sub       → precisa bater com um "id" de subs (ou null)
   imagem    → caminho da foto em assets/produtos/
   link      → ⚠️ LINK DE AFILIADO gerado no portal do AliExpress
   tag       → selo no card: "Mais vendido", "Oferta"… (opcional)
   nota      → sua recomendação pessoal, 1 linha (opcional, converte muito)
*/
const PRODUTOS = [
  {
    id: "naval",
    titulo: "O Almanaque de Naval Ravikant",
    subtitulo: "Um guia para a riqueza e a felicidade · Eric Jorgenson",
    categoria: "livros",
    sub: null,
    imagem: "assets/produtos/naval.webp",
    link: "https://s.click.aliexpress.com/e/_SEU-LINK", // ← troque pelo seu link
    tag: "Favorito",
    nota: "Prefácio do Tim Ferriss. Leitura curta, ideias que ficam.",
  },
  {
    id: "coragem",
    titulo: "A Coragem de Não Agradar",
    subtitulo: "Ichiro Kishimi e Fumitake Koga · Sextante",
    categoria: "livros",
    sub: null,
    imagem: "assets/produtos/coragem.webp",
    link: "https://s.click.aliexpress.com/e/_SEU-LINK", // ← troque pelo seu link
    tag: "3 milhões vendidos",
    nota: "Filosofia aplicada de um jeito que dá vontade de virar a página.",
  },

  /* ===== MODELO — copie daqui para baixo para adicionar =====
  {
    id: "vara-telescopica",
    titulo: "Vara de Pesca Telescópica 2,10m",
    subtitulo: "Carbono · com molinete",
    categoria: "pesca",
    sub: "acessorios",
    imagem: "assets/produtos/vara.webp",
    link: "https://s.click.aliexpress.com/e/_SEU-LINK",
    tag: "Oferta",
    nota: "Ótimo custo-benefício para começar.",
  },
  ========================================================= */
];

/* ---------- PERFIL (link na bio) ---------- */
const PERFIL = {
  nome: "Meus Achados",
  bio: "Produtos que eu uso e recomendo ❤️ Links direto pro AliExpress",
  instagram: "https://www.instagram.com/",
  instagramLabel: "@seuperfil",
  /* Link geral da sua vitrine/perfil de afiliado no AliExpress. */
  loja: "https://pt.aliexpress.com/",
};
