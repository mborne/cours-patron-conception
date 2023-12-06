# Construction de la présentation

## Génération de la présentation

```bash
cd cours-patron-conception
npm install
npm run build
# test en local avec http://127.0.0.1:3000
npm run start
```

## Contrôles des liens

```bash
# En ignorant les annexes sur src/slides...
npx markdown-to-html check src/slides 2>&1 | grep -v annexe
# En ignorant le retour à la présentation
npx markdown-to-html check src/annexe 2>&1 | grep -v '../'
```
