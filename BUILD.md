# Construction de la présentation

Les présentations (`src/slides/*.md`) sont rendues avec [Marp](https://marp.app/) et le thème `geodata` (charte Géodata Paris) fourni par la skill [marp-geodata](https://github.com/mborne/skills/tree/main/skills/marp-geodata).

* `theme/geodata.css` : thème téléchargé par `npm run theme` (non versionné, figé sur un commit dans `build.js`)
* `theme/cours.css` : extension du thème pour les besoins du cours (colonnes « à éviter / à privilégier », images centrées, classe `dense`)
* `marp.config.js` : configuration Marp (réécriture des liens `*.md` en `*.html`)
* `src/slides/redirections/*.html` : pages de redirection copiées à la racine de `public/` (ex : `refactoring.html` vers la fiche [mborne.github.io - Le refactoring](https://mborne.github.io/architecture/refactoring/))

## Génération de la présentation

```bash
cd cours-patron-conception
npm install
npm run build
# test en local avec http://127.0.0.1:3000
npm run start
```

## Aperçu des diapositives en PNG

```bash
# génère preview/*.png (nécessite Chrome/Chromium, voir CHROME_PATH)
npm run preview
```

## Édition avec VS Code

Avec l'extension [Marp for VS Code](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode), lancer `npm run theme` une fois pour disposer de `theme/geodata.css` (thèmes déclarés dans `.vscode/settings.json`).

## Contrôles des liens

```bash
npm test
```
