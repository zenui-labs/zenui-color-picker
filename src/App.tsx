import {useEffect} from "react";
import {InkProvider} from "./demo/lib/ink";
import {usePath} from "./demo/lib/router";
import {featureBySlug} from "./demo/lib/features";
import Navbar from "./demo/sections/navbar";
import Footer from "./demo/sections/footer";
import Home from "./demo/pages/home";
import FeaturePage from "./demo/pages/feature";
import {PrivacyPage, TermsPage} from "./demo/pages/legal";
import NotFound from "./demo/pages/not-found";

function Page({path}: { path: string }) {
    if (path === '/') return <Home/>;
    if (path === '/privacy') return <PrivacyPage/>;
    if (path === '/terms') return <TermsPage/>;
    const feature = path.startsWith('/features/') ? featureBySlug(path.slice('/features/'.length).replace(/\/$/, '')) : undefined;
    if (feature) return <FeaturePage key={feature.slug} feature={feature}/>;
    return <NotFound/>;
}

function App() {
    const path = usePath();

    // New page: start at the top, or at the #section the link pointed to.
    useEffect(() => {
        const target = location.hash ? document.querySelector(location.hash) : null;
        if (target) requestAnimationFrame(() => target.scrollIntoView());
        else scrollTo(0, 0);
    }, [path]);

    return (
        <InkProvider>
            <Navbar/>
            <main key={path} className="page-enter">
                <Page path={path}/>
            </main>
            <Footer/>
            <div aria-hidden="true" className="wipe"/>
        </InkProvider>
    );
}

export default App;
