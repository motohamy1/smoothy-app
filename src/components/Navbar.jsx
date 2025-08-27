import React from 'react'
import {navLinks} from "../../constants/index.js";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
const Navbar = () => {
    useGSAP(()=>{
        const navTween = gsap.timeline({
            scrollTrigger:{
                trigger:'nav',
                start:'bottom top'
            }
        });
        navTween.fromTo("nav",{backgroundColor:'transparent'},{
            backgroundColor:'#00000050',
            backgroundFilter:'blur(10px)',
            duration: 1,
            ease:'power1.inOut'
        });
    })
    return (
        <nav>
            <div>
                <a href='' className='flex items-center gap-2'>
                    <img src="/images/drink1.png" alt="logo" width={32} height={32}/>
                    <p>Velvet Pour</p>
                </a>
                <ul>
                    {navLinks.map((link) =>(
                            <li key={link.id}>
                                <a href={link.href}>{link.title}</a>
                            </li>

                    ))}
                </ul>
            </div>
        </nav>
    )
}
export default Navbar
