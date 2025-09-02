import Navbar from "./demo/sections/navbar";
import Hero from "./demo/sections/hero";
import {FeaturesSection} from "./demo/sections/features";
import Playground from "./demo/sections/playground";
import Footer from "./demo/sections/footer";

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