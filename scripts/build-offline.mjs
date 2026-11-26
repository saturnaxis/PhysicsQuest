import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const groups = await Promise.all(entries.map(entry => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesIn(path) : [path];
  }));
  return groups.flat();
}

const files = (await filesIn('dist')).filter(path => !path.endsWith('/sw.js') && !path.endsWith('/.nojekyll')).sort();
const hash = createHash('sha256');
const worker = await readFile('scripts/service-worker.js', 'utf8');
hash.update(worker);
for (const path of files) {
  hash.update(path);
  hash.update(await readFile(path));
}
const version = hash.digest('hex').slice(0, 16);
const paths = files.map(path => './' + path.slice('dist/'.length));
const header = `const VERSION = ${JSON.stringify(version)};\nconst PRECACHE = ${JSON.stringify(paths)};\n`;
await writeFile('dist/sw.js', header + worker);
