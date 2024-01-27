import React from "react";
import About from "../components/home/About";
import Banner from "../components/home/Banner";
import FAQ from "../components/home/FAQ";
import Options from "../components/home/Options";


function HomePage(){
    return (
        <div className="main">
            <Banner/>
            <About/>
            <Options/>
            <FAQ/>
        </div>
    )
}


export default HomePage;