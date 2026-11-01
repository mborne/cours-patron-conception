/**
 * Configuration Marp (utilisée par `npm run build` et l'extension VS Code).
 *
 * Le thème "geodata" est récupéré par `npm run theme` (voir build.js).
 */

/*
 * Réécriture des liens entre présentations : "poo.md" -> "poo.html"
 * (les sources restent navigables sur GitHub et vérifiables par markdown-link-check).
 */
function mdLinksToHtml(md) {
    md.core.ruler.push('md_links_to_html', (state) => {
        const visit = (tokens) => {
            for (const token of tokens) {
                if (token.type === 'link_open') {
                    const href = token.attrGet('href');
                    if (href && !/^[a-z]+:/i.test(href)) {
                        token.attrSet('href', href.replace(/\.md(#.*)?$/, '.html$1'));
                    }
                }
                if (token.children) {
                    visit(token.children);
                }
            }
        };
        visit(state.tokens);
    });
}

module.exports = {
    inputDir: './src/slides',
    output: './public',
    html: true,
    themeSet: ['./theme/geodata.css', './theme/cours.css'],
    engine: ({ marp }) => marp.use(mdLinksToHtml),
};
