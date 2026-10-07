import {useEffect} from "react";
import {Link} from "../lib/link";
import {useInk} from "../lib/ink-context";

const NotFound = () => {
    const {color} = useInk();

    useEffect(() => {
        document.title = 'Missing swatch · ColorPicker for React';
    }, []);

    return (
        <section className="mx-auto grid min-h-[80vh] max-w-[1240px] place-items-center px-4 pt-24 text-center sm:px-6">
            <div>
                <div className="mx-auto mb-10 w-40 rotate-[-6deg] rounded-[18px] border border-line bg-card p-2.5 shadow-xl">
                    <div className="grid h-40 place-items-center rounded-[12px] border-2 border-dashed border-[var(--line-strong)]">
                        <span className="font-mono text-xs text-muted">no color</span>
                    </div>
                    <p className="display mt-2 text-left text-2xl">404</p>
                </div>
                <h1 className="display text-[clamp(2.6rem,7vw,5rem)]">This swatch is missing.</h1>
                <p className="mx-auto mt-4 max-w-md text-lg text-muted">
                    The page you asked for is not in the deck. Your ink is still {color.hex.slice(0, 7)}, though.
                </p>
                <Link to="/" className="mt-8 inline-flex rounded-full bg-text px-5 py-2.5 text-sm font-medium text-paper">
                    Back to the picker
                </Link>
            </div>
        </section>
    );
};

export default NotFound;
