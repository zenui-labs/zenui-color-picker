import Navbar from "./demo/sections/navbar.tsx";
import Hero from "./demo/sections/hero.tsx";
import {FeaturesSection} from "./demo/sections/features.tsx";
import Playground from "./demo/sections/playground.tsx";
import Footer from "./demo/sections/footer.tsx";

function App() {
    return (
        <section className='dark:bg-darkBg relative'>
            <div
                className='size-80 lg:size-96 absolute left-0 top-0 dark:-top-16 rounded-full bg-accent/70 dark:bg-accent blur-[230px]'></div>
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