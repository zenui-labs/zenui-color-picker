import {useEffect} from "react";
import Hero from "../sections/hero";
import Formats from "../sections/formats";
import Features from "../sections/features";
import Variants from "../sections/variants";
import Playground from "../sections/playground";

const Home = () => {
    useEffect(() => {
        document.title = 'ColorPicker for React by ZenUI Labs';
    }, []);

    return (
        <>
            <Hero/>
            <Formats/>
            <Features/>
            <Variants/>
            <Playground/>
        </>
    );
};

export default Home;
