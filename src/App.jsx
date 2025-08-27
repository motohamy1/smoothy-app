import gsap from "gsap";
import {ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

import React from 'react'
import Navbar from "./components/Navbar.jsx";


const App = () => {
    return (
        <main className="">
            <Navbar />
        </main>

    )
}
export default App