import {FeaturesSection} from "./sections/features.tsx";
import {PlaygroundSection} from "./sections/playground.tsx";
import Navbar from "./sections/navbar.tsx";
import Hero from "./sections/hero.tsx";
import Footer from "./sections/footer.tsx";

function App() {
    return (
        <>
            <Navbar/>
            <Hero/>
            <FeaturesSection/>
            <PlaygroundSection/>
            <Footer/>
        </>
    );
}

export default App;