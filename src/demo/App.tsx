import {FeaturesSection} from "./sections/features.tsx";
import Navbar from "./sections/navbar.tsx";
import Hero from "./sections/hero.tsx";
import Footer from "./sections/footer.tsx";
import Playground from "./sections/playground.tsx";

function App() {
    return (
        <section className='dark:bg-darkBg relative'>
            <div
                className='size-96 absolute left-0 top-0 dark:-top-16 rounded-full bg-accent/70 dark:bg-accent blur-[230px]'></div>
            <div className='relative'>
                <Navbar/>
                <Hero/>
                <FeaturesSection/>
                <Playground/>
                <Footer/>
            </div>
        </section>
    );
}

export default App;