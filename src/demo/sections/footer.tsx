import {CSSProperties, useEffect, useRef} from "react";
import {useInk} from "../lib/ink-context";
import {ArrowGlyph, GithubGlyph} from "../lib/art";
import {FEATURES} from "../lib/features";
import {Link} from "../lib/link";
import {prefersReducedMotion} from "../lib/motion";
import {useInView} from "../lib/useInView";
import {PackageFacts} from "../components/PackageFacts";
import {InstallTape} from "../components/InstallTape";
import {copyText} from "../../package/hooks/useColorPicker";

/* ---------- paint wall: move across it and leave a trail that slowly dries away ---------- */

const PaintWall = () => {
    const {color} = useInk();
    const wrapRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const hue = useRef(color.hsl.h);
    const sat = useRef(color.hsl.s);
    const {ref: viewRef, seen} = useInView<HTMLDivElement>(0.35);

    useEffect(() => {
        hue.current = color.hsl.h;
        sat.current = Math.max(55, color.hsl.s);
    }, [color]);

    useEffect(() => {
        const wrap = wrapRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!wrap || !canvas || !ctx) return;

        let last: { x: number; y: number } | null = null;
        let travelled = 0;
        let lastPaint = 0;
        let frame = 0;

        const resize = () => {
            const dpr = Math.min(2, devicePixelRatio || 1);
            canvas.width = wrap.clientWidth * dpr;
            canvas.height = wrap.clientHeight * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        const observer = new ResizeObserver(resize);
        observer.observe(wrap);

        // Fade a little every frame, and stop the loop once the wall has been quiet for a while.
        const dry = () => {
            ctx.globalCompositeOperation = "destination-out";
            ctx.fillStyle = "rgba(0,0,0,0.0035)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = "source-over";
            if (performance.now() - lastPaint > 14000) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                frame = 0;
                return;
            }
            frame = requestAnimationFrame(dry);
        };

        const dab = (x: number, y: number, r: number) => {
            const h = hue.current + Math.sin(travelled / 260) * 38;
            const g = ctx.createRadialGradient(x, y, 0, x, y, r);
            g.addColorStop(0, `hsla(${h}, ${sat.current}%, 52%, .95)`);
            g.addColorStop(0.7, `hsla(${h}, ${sat.current}%, 48%, .85)`);
            g.addColorStop(1, `hsla(${h}, ${sat.current}%, 45%, 0)`);
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        };

        const stroke = (x: number, y: number) => {
            const from = last ?? {x, y};
            const dist = Math.hypot(x - from.x, y - from.y);
            const r = Math.min(64, 20 + dist * 0.55);
            const steps = Math.max(1, Math.ceil(dist / 5));
            for (let i = 1; i <= steps; i++) {
                const t = i / steps;
                travelled += dist / steps;
                dab(from.x + (x - from.x) * t, from.y + (y - from.y) * t, r);
            }
            if (dist > 24 && Math.random() > 0.6) {
                // Flick a few drops off fast strokes.
                for (let k = 0; k < 3; k++) {
                    dab(x + (Math.random() - 0.5) * r * 3, y + (Math.random() - 0.5) * r * 3, 2 + Math.random() * 5);
                }
            }
            last = {x, y};
            lastPaint = performance.now();
            if (!frame) frame = requestAnimationFrame(dry);
        };

        const onMove = (e: PointerEvent) => {
            const rect = wrap.getBoundingClientRect();
            stroke(e.clientX - rect.left, e.clientY - rect.top);
        };
        const onLeave = () => {
            last = null;
        };
        wrap.addEventListener("pointermove", onMove);
        wrap.addEventListener("pointerleave", onLeave);
        wrap.addEventListener("pointerup", onLeave);

        // First visit: the wall paints its own squiggle so people see what it does.
        let auto = 0;
        if (seen && !prefersReducedMotion) {
            const start = performance.now();
            const w = wrap.clientWidth;
            const hgt = wrap.clientHeight;
            const run = (now: number) => {
                const t = Math.min(1, (now - start) / 1800);
                stroke(w * (0.06 + t * 0.88), hgt * (0.5 + Math.sin(t * Math.PI * 3) * 0.28));
                if (t < 1) auto = requestAnimationFrame(run);
                else last = null;
            };
            auto = requestAnimationFrame(run);
        }

        return () => {
            cancelAnimationFrame(frame);
            cancelAnimationFrame(auto);
            observer.disconnect();
            wrap.removeEventListener("pointermove", onMove);
            wrap.removeEventListener("pointerleave", onLeave);
            wrap.removeEventListener("pointerup", onLeave);
        };
    }, [seen]);

    return (
        <div ref={viewRef}>
            <div ref={wrapRef}
                 className="paint-wall relative h-[52vh] min-h-[320px] cursor-crosshair touch-pan-y overflow-hidden">
                <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full"/>
                <div aria-hidden="true"
                     className="wordmark pointer-events-none absolute inset-0 flex select-none items-center justify-center whitespace-nowrap text-[16.5vw] leading-none">
                    color<em>picker</em>
                </div>
                <p className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/[.07] px-3 py-1.5 font-mono text-[11px] text-white/60 backdrop-blur">
                    move across the wall to paint. it dries on its own.
                </p>
            </div>
        </div>
    );
};

/** Paint running off the bottom of the page into the footer. Each drip breathes on its own clock. */
const DRIPS = [[4, 46], [11, 90], [17, 30], [26, 120], [33, 58], [41, 34], [49, 104], [57, 48], [64, 140], [72, 40], [80, 86], [88, 52], [95, 112]];

const DripEdge = () => (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-40 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-3 bg-ink transition-colors duration-500"/>
        {DRIPS.map(([left, len], i) => (
            <span key={left} className="footer-drip absolute top-0 rounded-b-full bg-ink transition-colors duration-500"
                  style={{left: `${left}%`, width: 10 + (i % 3) * 6, height: len, '--d': `${(i * 0.37) % 2.4}s`} as CSSProperties}/>
        ))}
    </div>
);

const COLUMNS: { title: string; links: { label: string; to: string; external?: boolean }[] }[] = [
    {
        title: "Explore",
        links: [
            {label: "Formats", to: "/#formats"},
            {label: "Features", to: "/#features"},
            {label: "Variants", to: "/#variants"},
            {label: "Playground", to: "/#playground"},
        ],
    },
    {
        title: "Features",
        links: FEATURES.slice(0, 5).map((f) => ({label: f.title, to: `/features/${f.slug}`})),
    },
    {
        title: "Project",
        links: [
            {label: "Changelog", to: "https://github.com/zenui-labs/zenui-color-picker/releases", external: true},
            {label: "Report a bug", to: "https://github.com/zenui-labs/zenui-color-picker/issues", external: true},
            {label: "Privacy", to: "/privacy"},
            {label: "Terms", to: "/terms"},
        ],
    },
];

const Footer = () => {
    const {palette, color} = useInk();

    return (
        <footer className="footer relative overflow-hidden text-[#f3f0e8]">
            <DripEdge/>

            <div className="relative mx-auto max-w-[1240px] px-4 pb-16 pt-44 sm:px-6">
                <div className="grid items-end gap-10 lg:grid-cols-[1.3fr_1fr]">
                    <h2 className="display text-[clamp(3rem,8vw,7rem)]">
                        Ready when your <em className="text-ink transition-colors duration-500">palette</em> is.
                    </h2>
                    <div className="grid gap-5 lg:justify-items-end">
                        <InstallTape/>
                        <div className="flex flex-wrap gap-2">
                            <a href="https://github.com/zenui-labs/zenui-color-picker" target="_blank" rel="noreferrer"
                               className="footer-pill">
                                <GithubGlyph className="size-4"/> Star on GitHub
                            </a>
                            <a href="https://www.npmjs.com/package/@zenuilabs/color-picker-react" target="_blank" rel="noreferrer"
                               className="footer-pill">
                                View on npm
                                <ArrowGlyph className="size-4 -rotate-45"/>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-20 grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
                    <PackageFacts dark/>

                    <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3">
                        {COLUMNS.map((col) => (
                            <div key={col.title}>
                                <p className="mb-4 text-sm text-white/45">{col.title}</p>
                                <ul className="grid gap-2.5">
                                    {col.links.map((l) => (
                                        <li key={l.label}>
                                            {l.external ? (
                                                <a href={l.to} target="_blank" rel="noreferrer" className="footer-link">{l.label}</a>
                                            ) : (
                                                <Link to={l.to} className="footer-link">{l.label}</Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </div>

                <div className="mt-20">
                    <p className="text-sm text-white/45">Your palette from this visit</p>
                    <div className="mt-4 flex min-h-[72px] flex-wrap items-end gap-2">
                        {palette.length === 0 && (
                            <p className="text-white/60">Nothing yet. Pick something above and it lands here.</p>
                        )}
                        {palette.map((hex, i) => (
                            <button key={hex} type="button"
                                    onClick={() => copyText(hex)}
                                    title={`Copy ${hex}`}
                                    className="group relative h-[72px] w-12 cursor-pointer overflow-hidden rounded-xl transition-[width] duration-500 ease-[var(--ease-spring)] hover:w-24"
                                    style={{background: hex, animation: 'pop-in .6s var(--ease-spring) backwards', zIndex: palette.length - i}}>
                                <span className="absolute bottom-1.5 left-2 font-mono text-[10px] text-white opacity-0 mix-blend-difference transition-opacity group-hover:opacity-100">
                                    {hex.slice(1)}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <PaintWall/>

            <div className="relative mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-4 px-4 py-7 text-sm text-white/55 sm:flex-row sm:items-center sm:px-6">
                <p>© 2026 <a href="https://zenui.net" target="_blank" rel="noreferrer" className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">ZenUI Labs</a>. Code under the MIT license.</p>
                <div className="flex items-center gap-5">
                    <span className="flex items-center gap-2 font-mono text-xs">
                        <span className="size-3 rounded-sm bg-ink transition-colors duration-500"/> {color.hex.slice(0, 7)}
                    </span>
                    <button type="button" onClick={() => scrollTo({top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth'})}
                            className="footer-pill">
                        Back to top
                        <ArrowGlyph className="size-4 -rotate-90"/>
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
