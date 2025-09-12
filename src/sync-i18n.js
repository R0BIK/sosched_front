import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseLang = 'ru';
const targetLangs = ['uk', 'en'];
const namespace = 'auth';

const basePath = path.join(__dirname, 'locales', baseLang, `${namespace}.json`);
const baseData = JSON.parse(fs.readFileSync(basePath, 'utf-8'));

function syncKeys(base, target) {
    const result = { ...target };

    for (const key in base) {
        if (!Object.prototype.hasOwnProperty.call(target, key)) {
            result[key] = 'TODO: translate';
        } else if (typeof base[key] === 'object' && base[key] !== null) {
            result[key] = syncKeys(base[key], target[key] || {});
        }
    }

    return result;
}

for (const lang of targetLangs) {
    const targetPath = path.join(__dirname, 'locales', lang, `${namespace}.json`);
    const targetData = fs.existsSync(targetPath)
        ? JSON.parse(fs.readFileSync(targetPath, 'utf-8'))
        : {};

    const synced = syncKeys(baseData, targetData);

    fs.writeFileSync(targetPath, JSON.stringify(synced, null, 2), 'utf-8');
    console.log(`✅ Синхронізовано: ${lang}/${namespace}.json`);
}