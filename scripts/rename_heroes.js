
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const heroesDir = path.resolve(process.cwd(), 'public/heroes');

console.log(`Checking directory: ${heroesDir}`);

if (!fs.existsSync(heroesDir)) {
    console.error('Directory not found:', heroesDir);
    process.exit(1);
}

const files = fs.readdirSync(heroesDir);
let count = 0;

files.forEach(file => {
    if (file.includes('_pixel_art_') && file.endsWith('.png')) {
        const newName = file.replace(/_pixel_art_\d+/, '');
        const oldPath = path.join(heroesDir, file);
        const newPath = path.join(heroesDir, newName);

        try {
            fs.renameSync(oldPath, newPath);
            console.log(`Renamed ${file} to ${newName}`);
            count++;
        } catch (e) {
            console.error(`Failed to rename ${file}:`, e);
        }
    }
});

if (count === 0) {
    console.log('No files needed renaming.');
} else {
    console.log(`Renamed ${count} files.`);
}
