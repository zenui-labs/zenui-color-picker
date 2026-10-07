// Share images. `npm run og` screenshots this page into public/og.
// To tweak a layout, run `npm run dev` and open /scripts/og/?kind=card&w=1200&h=630 (or kind=variants, theme=dark).
import {createRoot} from 'react-dom/client';
import '../../src/site.css';
import {InkProvider} from '../../src/demo/lib/ink';
import {Card, Variants} from './scenes';

const params = new URLSearchParams(location.search);
const kind = params.get('kind') ?? 'card';
const width = Number(params.get('w') ?? 1200);
const height = Number(params.get('h') ?? 630);
if (params.get('theme') === 'dark') document.documentElement.classList.add('dark');

createRoot(document.getElementById('root')!).render(
    <InkProvider>
        <style>{`*,*::before,*::after{animation:none!important;transition:none!important}`}</style>
        <div style={{width, height}} className="relative overflow-hidden bg-paper text-text">
            {kind === 'variants' ? <Variants/> : <Card/>}
        </div>
    </InkProvider>
);
