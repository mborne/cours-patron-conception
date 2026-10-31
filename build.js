const fs = require('fs');
const path = require('path');
const { marpCli } = require('@marp-team/marp-cli');

/*
 * Thème Marp "geodata" (charte Géodata Paris) fourni par la skill marp-geodata
 * de https://github.com/mborne/skills, figé sur un commit pour un build reproductible.
 */
const THEME_REF = '1e0621a91c852a6ab8881a382ff291616520352f';
const THEME_URL = `https://raw.githubusercontent.com/mborne/skills/${THEME_REF}/skills/marp-geodata/theme/geodata.css`;
const THEME_PATH = path.resolve(__dirname, 'theme/geodata.css');
const THEME_REF_PATH = `${THEME_PATH}.ref`;

const SRC_DIR = path.resolve(__dirname, 'src/slides');
const PUBLIC_DIR = path.resolve(__dirname, 'public');

async function fetchTheme() {
    if (fs.existsSync(THEME_PATH) && fs.existsSync(THEME_REF_PATH)
        && fs.readFileSync(THEME_REF_PATH, 'utf8').trim() === THEME_REF) {
        console.log(`theme/geodata.css (${THEME_REF}) déjà présent`);
        return;
    }
    console.log(`téléchargement de ${THEME_URL}...`);
    const response = await fetch(THEME_URL);
    if (!response.ok) {
        throw new Error(`échec du téléchargement du thème : HTTP ${response.status}`);
    }
    fs.mkdirSync(path.dirname(THEME_PATH), { recursive: true });
    fs.writeFileSync(THEME_PATH, await response.text());
    fs.writeFileSync(THEME_REF_PATH, THEME_REF + '\n');
}

async function build() {
    await fetchTheme();
    if (process.argv.includes('--theme-only')) {
        return;
    }

    console.log('rm -rf public...');
    fs.rmSync(PUBLIC_DIR, { recursive: true, force: true });

    console.log('src/slides/*.md -> public/*.html (marp)...');
    const status = await marpCli(['--config-file', path.resolve(__dirname, 'marp.config.js')]);
    if (status !== 0) {
        throw new Error(`marp a échoué (code ${status})`);
    }

    console.log('copie des ressources statiques (img, annexe)...');
    for (const dir of ['img', 'annexe']) {
        fs.cpSync(path.join(SRC_DIR, dir), path.join(PUBLIC_DIR, dir), { recursive: true });
    }

    console.log('copie des redirections (redirections/*.html -> public/*.html)...');
    fs.cpSync(path.join(SRC_DIR, 'redirections'), PUBLIC_DIR, { recursive: true });
}

build().catch((err) => {
    console.error(err);
    process.exit(1);
});
