import {ReactNode, useEffect} from "react";
import {Link} from "../lib/link";
import {Reveal, Roller} from "../lib/reveal";

interface Section {
    id: string;
    title: string;
    body: ReactNode;
}

interface Doc {
    title: string;
    summary: string;
    updated: string;
    sections: Section[];
}

const A = ({href, children}: { href: string; children: ReactNode }) => (
    <a href={href} target="_blank" rel="noreferrer" className="underline decoration-line underline-offset-4 hover:decoration-text">{children}</a>
);

const ISSUES = "https://github.com/zenui-labs/zenui-color-picker/issues";

const PRIVACY: Doc = {
    title: "Privacy policy",
    summary: "This site does not ask who you are, sets no tracking cookies and runs no analytics. The npm package collects nothing at all.",
    updated: "October 7, 2026",
    sections: [
        {
            id: "scope",
            title: "What this covers",
            body: <p>This policy covers color-picker.zenui.net (the site) and the <code>@zenuilabs/color-picker-react</code> package
                (the package), both run by ZenUI Labs. Other ZenUI Labs products have their own policies.</p>,
        },
        {
            id: "package",
            title: "The package",
            body: <>
                <p>The package runs entirely inside the app that installs it. It makes no network requests, stores nothing,
                    and sends nothing to ZenUI Labs or anyone else.</p>
                <p>Two features use browser APIs, and only when the person using the app presses the button: copying writes
                    one color value to the clipboard, and the eyedropper asks the browser for the color of one pixel. The
                    browser returns that single value to the page. Nothing is uploaded.</p>
            </>,
        },
        {
            id: "collect",
            title: "What the site collects",
            body: <>
                <p>Nothing you type or pick on the site leaves your browser. Colors you choose, your palette from the visit and
                    the paint on the footer wall exist only in the open tab and are gone when you close it.</p>
                <p>The site stores one value in your browser's local storage: <code>zcp-theme</code>, which remembers whether you
                    chose the light or dark theme. You can clear it with your browser's site data settings.</p>
                <p>The site uses no cookies, no analytics, no advertising and no fingerprinting.</p>
            </>,
        },
        {
            id: "third-parties",
            title: "Services the site relies on",
            body: <ul>
                <li><strong>Netlify</strong> hosts the site. Like any web host it receives your IP address, browser user agent
                    and the pages requested, and may keep short-lived server logs for security and reliability. See
                    the <A href="https://www.netlify.com/privacy/">Netlify privacy policy</A>.</li>
                <li><strong>Google Fonts</strong> serves the typefaces. Your browser requests the font files from Google, which
                    receives your IP address and user agent. See the <A href="https://policies.google.com/privacy">Google
                        privacy policy</A>.</li>
                <li><strong>ImageKit</strong> hosts the preview image used when the site is shared on social media.</li>
                <li>Links to GitHub and npm take you to those services, which have their own policies.</li>
            </ul>,
        },
        {
            id: "rights",
            title: "Your choices",
            body: <p>Because the site holds no personal data about you, there is nothing for us to export or delete. You can
                block Google Fonts or clear local storage at any time; the site keeps working with fallback fonts and the
                default theme.</p>,
        },
        {
            id: "children",
            title: "Children",
            body: <p>The site is a developer tool and is not aimed at children. It collects no personal data from anyone,
                children included.</p>,
        },
        {
            id: "changes",
            title: "Changes",
            body: <p>If this policy changes, the new version will be posted here with a new date at the top. Material changes
                will also be noted in the project's <A href="https://github.com/zenui-labs/zenui-color-picker/releases">changelog</A>.</p>,
        },
        {
            id: "contact",
            title: "Contact",
            body: <p>Questions about privacy can be raised through <A href={ISSUES}>GitHub issues</A> or through the contact
                details on <A href="https://zenui.net">zenui.net</A>.</p>,
        },
    ],
};

const TERMS: Doc = {
    title: "Terms and conditions",
    summary: "The code is free under the MIT license. The site is a demo provided as is. Be kind with it.",
    updated: "October 7, 2026",
    sections: [
        {
            id: "acceptance",
            title: "Agreement",
            body: <p>By using color-picker.zenui.net (the site) or the <code>@zenuilabs/color-picker-react</code> package
                (the package), you agree to these terms. If you do not agree, please do not use them.</p>,
        },
        {
            id: "license",
            title: "License for the package",
            body: <>
                <p>The package source code is licensed under the <A href="https://github.com/zenui-labs/zenui-color-picker/blob/main/LICENSE">MIT
                    license</A>. You may use, copy, modify, merge, publish, distribute, sublicense and sell copies, in
                    personal and commercial projects, as long as the copyright notice and license text are kept.</p>
                <p>Where these terms and the MIT license disagree about the code, the MIT license wins.</p>
            </>,
        },
        {
            id: "site",
            title: "Using the site",
            body: <>
                <p>The site exists to document and demonstrate the package. You may use it freely for that purpose.</p>
                <p>Please do not try to disrupt the site, overload it with automated traffic, probe it for vulnerabilities
                    outside of responsible disclosure, or use it to break the law.</p>
            </>,
        },
        {
            id: "brand",
            title: "Names and logos",
            body: <p>The MIT license covers code. It does not grant rights to the ZenUI Labs name, the ColorPicker paint chip
                mark or the site's design and copy. You may refer to the project by name to describe it, but please do not
                suggest endorsement by ZenUI Labs without permission.</p>,
        },
        {
            id: "contributions",
            title: "Contributions",
            body: <p>If you contribute code, documentation or issues to the project, you confirm you have the right to do so and
                agree that code contributions are licensed under the MIT license.</p>,
        },
        {
            id: "warranty",
            title: "No warranty",
            body: <p>The package and the site are provided "as is", without warranty of any kind, express or implied, including
                merchantability, fitness for a particular purpose and non-infringement. Color conversions, CMYK values and
                contrast grades are calculated approximations. Check critical colors against your own print or accessibility
                requirements.</p>,
        },
        {
            id: "liability",
            title: "Limitation of liability",
            body: <p>To the extent the law allows, ZenUI Labs and the contributors are not liable for any claim, damages or other
                liability arising from the package or the site, or from using them.</p>,
        },
        {
            id: "links",
            title: "Other websites",
            body: <p>The site links to GitHub, npm and other services. ZenUI Labs does not control them and is not responsible for
                their content or practices.</p>,
        },
        {
            id: "changes",
            title: "Changes",
            body: <p>These terms may be updated. The date at the top shows the latest version. Continuing to use the site after a
                change means you accept the new terms.</p>,
        },
        {
            id: "contact",
            title: "Contact",
            body: <p>Questions about these terms can be raised through <A href={ISSUES}>GitHub issues</A> or through the contact
                details on <A href="https://zenui.net">zenui.net</A>.</p>,
        },
    ],
};

const LegalPage = ({doc, other}: { doc: Doc; other: { to: string; label: string } }) => {
    useEffect(() => {
        document.title = `${doc.title} · ColorPicker for React`;
    }, [doc]);

    return (
        <article className="relative pt-16">
            <header className="mx-auto max-w-[1240px] px-4 pb-12 pt-14 sm:px-6 lg:pt-20">
                <p className="font-mono text-xs text-muted">Last updated {doc.updated}</p>
                <Roller as="h1" className="display mt-5 text-[clamp(3rem,9vw,7rem)]">{doc.title}</Roller>
                <Reveal as="p" delay={150} className="mt-6 max-w-2xl text-xl leading-relaxed text-muted">
                    {doc.summary}
                </Reveal>
            </header>

            <div className="mx-auto grid max-w-[1240px] gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[240px_1fr] lg:gap-20">
                <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:self-start">
                    <ol className="grid gap-2 text-sm">
                        {doc.sections.map((s) => (
                            <li key={s.id}>
                                <a href={`#${s.id}`} className="group flex items-center gap-2.5 text-muted transition-colors hover:text-text">
                                    <span className="size-1.5 rounded-full bg-ink opacity-0 transition-opacity group-hover:opacity-100"/>
                                    <span>{s.title}</span>
                                </a>
                            </li>
                        ))}
                    </ol>
                    <Link to={other.to} className="mt-8 inline-block rounded-full border border-line px-4 py-2 text-sm hover:border-text">
                        Read the {other.label}
                    </Link>
                </nav>

                <div className="legal max-w-[46rem]">
                    {doc.sections.map((s) => (
                        <Reveal as="section" key={s.id} className="scroll-mt-24 py-7 first:pt-0">
                            <h2 id={s.id} className="display text-4xl">
                                {s.title}
                            </h2>
                            <div className="mt-4">{s.body}</div>
                        </Reveal>
                    ))}
                    <p className="mt-10 text-sm text-muted">
                        This page is written in plain language and is not legal advice.
                    </p>
                </div>
            </div>
        </article>
    );
};

export const PrivacyPage = () => <LegalPage doc={PRIVACY} other={{to: '/terms', label: 'terms'}}/>;
export const TermsPage = () => <LegalPage doc={TERMS} other={{to: '/privacy', label: 'privacy policy'}}/>;
