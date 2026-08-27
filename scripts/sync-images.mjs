import fs from 'node:fs/promises';
import path from 'node:path';

const root = new URL('../public/images/', import.meta.url);
const manifest = JSON.parse(await fs.readFile(new URL('remote-images.json', root), 'utf8'));

for (const item of manifest) {
  const target = new URL(item.filename, root);
  try {
    const res = await fetch(item.url);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const data = new Uint8Array(await res.arrayBuffer());
    await fs.writeFile(target, data);
    console.log(`saved ${item.filename}`);
  } catch (err) {
    console.error(`failed ${item.url}: ${err.message}`);
  }
}
