# 🛒 Vitrine de Afiliados AliExpress — Link na Bio

Site temático para divulgar seus produtos afiliados do AliExpress.
Você põe o link no Instagram → a pessoa acessa → filtra por categoria →
clica no produto → vai direto pro AliExpress com o seu link de afiliado.

Identidade visual: **vermelho AliExpress**.

---

## ⭐ Como adicionar um produto novo (o fluxo do dia a dia)

**1. Gere o link de afiliado** (etapa que garante sua comissão):
   - Acesse o portal: [portals.aliexpress.com](https://portals.aliexpress.com)
   - Vá em **Ad Center → Link Generator** → cole a URL do produto → **Gerar**.
   - O link sai parecido com `https://s.click.aliexpress.com/e/_XXXXXX`.

**2. Salve a foto** do produto em `assets/produtos/` (ideal: .webp, até 600px, até 100KB).

**3. Abra `js/produtos.js`** e cole um bloco novo no topo da lista `PRODUTOS`:

```js
{
  id: "vara-telescopica",
  titulo: "Vara de Pesca Telescópica 2,10m",
  subtitulo: "Carbono · com molinete",
  categoria: "pesca",          // pesca | livros | cozinha
  sub: "acessorios",           // acessorios | roupas | iscas | null
  imagem: "assets/produtos/vara.webp",
  link: "https://s.click.aliexpress.com/e/_SEU-LINK",
  tag: "Oferta",               // opcional
  nota: "Ótimo custo-benefício.",  // opcional, converte muito
},
```

**4. Salve e faça commit no GitHub.** A Vercel publica sozinha em ~30 segundos.
   Não precisa mexer em mais nenhum arquivo.

---

## ⚠️ Link de afiliado — leia isto

- Use **sempre** o link `s.click.aliexpress.com/e/_...` gerado no portal.
- Link normal de produto (`pt.aliexpress.com/item/...`) **não paga comissão**.
- O site avisa no **console do navegador** (F12) se algum link estiver sem rastreio.

---

## 🎨 Personalização rápida

- **Nome, bio, Instagram e link da loja** → `js/produtos.js`, bloco `PERFIL`.
- **Categorias e subfiltros** → `js/produtos.js`, lista `CATEGORIAS`.
- **Cores** → `css/style.css`, variáveis no `:root`
  (`--primaria` vermelho, `--gradiente` do hero).

## 📁 Estrutura

```
aliexpress-bio/
├── index.html          → estrutura da página
├── css/style.css       → visual (vermelho AliExpress)
├── js/produtos.js      → ⭐ ÚNICO arquivo que você edita no dia a dia
├── js/main.js          → filtros, busca e render (não precisa mexer)
├── js/walker.js        → carrinho que anda com o scroll
├── js/vendor/          → anime.js (animações)
└── assets/             → logo e fotos dos produtos
```

## 🚀 Publicar

1. Crie um repositório no GitHub e suba esta pasta.
2. Em [vercel.com](https://vercel.com), importe o repositório → **Deploy**.
3. Cole o link gerado na bio do Instagram. Pronto.

Site independente, não oficial. Esta página usa links de afiliado do AliExpress.
