// Renders the share images in public/og with headless Chrome.
// Usage: npm run og   (set CHROME to your Chrome binary if it is not in the default macOS spot)
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {existsSync, mkdirSync, mkdtempSync, rmSync, statSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join, resolve} from 'node:path';
import {setTimeout as sleep} from 'node:timers/promises';
import {createServer} from 'vite';

const CHROME = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT = resolve('public/og');

const SHOTS = [
    {file: 'og.png', kind: 'card', w: 1200, h: 630, scale: 1},
    {file: 'github-social.png', kind: 'card', w: 1280, h: 640, scale: 1},
    {file: 'readme-light.png', kind: 'card', w: 1200, h: 630, scale: 2},
    {file: 'readme-dark.png', kind: 'card', w: 1200, h: 630, scale: 2, theme: 'dark'},
    {file: 'variants-light.png', kind: 'variants', w: 1600, h: 1000, scale: 1},
    {file: 'variants-dark.png', kind: 'variants', w: 1600, h: 1000, scale: 1, theme: 'dark'},
];

// Headless Chrome on macOS can keep running after it writes the file, so wait for the
// file to stop growing and then end the process ourselves.
async function shoot(url, file, w, h, scale) {
    const profile = mkdtempSync(join(tmpdir(), 'zcp-og-'));
    rmSync(file, {force: true});
    const chrome = spawn(CHROME, [
        '--headless', `--user-data-dir=${profile}`, '--hide-scrollbars', '--disable-gpu',
        `--window-size=${w},${h}`, `--force-device-scale-factor=${scale}`,
        '--virtual-time-budget=8000', `--screenshot=${file}`, url,
    ], {stdio: 'ignore'});
    let size = -1;
    try {
        for (let waited = 0; waited < 60_000; waited += 500) {
            await sleep(500);
            if (!existsSync(file)) continue;
            const next = statSync(file).size;
            if (next > 0 && next === size) return;
            size = next;
        }
        throw new Error(`Timed out rendering ${file}`);
    } finally {
        const exited = once(chrome, 'exit');
        chrome.kill();
        await exited;
        rmSync(profile, {recursive: true, force: true, maxRetries: 5});
    }
}

mkdirSync(OUT, {recursive: true});
const server = await createServer({server: {port: 5199, strictPort: true}, logLevel: 'error'});
await server.listen();

try {
    for (const {file, kind, w, h, scale, theme = 'light'} of SHOTS) {
        const url = `http://localhost:5199/scripts/og/?kind=${kind}&w=${w}&h=${h}&theme=${theme}`;
        await shoot(url, resolve(OUT, file), w, h, scale);
        console.log(`${file}  ${w * scale}x${h * scale}`);
    }
} finally {
    await server.close();
}
