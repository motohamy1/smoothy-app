import React from 'react'
import {useRef} from "react";
import {useGSAP} from "@gsap/react";
import {SplitText, ScrollTrigger} from "gsap/all";
import {gsap} from "gsap";
import {useMediaQuery} from "react-responsive";
function Hero() {
    const videoRef = useRef();
    const isMobile = useMediaQuery({maxWidth: 767})


    useGSAP(()=>{
        // Register ScrollTrigger once within this hook
        gsap.registerPlugin(ScrollTrigger);

        const heroSplit = new SplitText(".title", {type: "chars, words"})
        const paragraph = new SplitText(".subtitle", {type: "lines"})

        heroSplit.chars.forEach((char)=> char.classList.add('text-gradient'));
        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06
        });

        gsap.from(paragraph.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06,
            delay: 1
        });

        // Parallax leaves on hero scroll
        gsap.timeline({
            scrollTrigger:{
                trigger:'#hero',
                start:'top top',
                end:'bottom top',
                scrub: true,
            }
        })
            .to('.left-leaf', {y:200},0)
            .to('.right-leaf', {y:-200},0)

        // Scroll-controlled video playback
        const startValue = isMobile ? 'top 50%' : 'center 60%';
        const endValue = isMobile ? '120% top' : 'bottom top';

        const tl = gsap.timeline({
            scrollTrigger:{
                trigger:'video',
                start: startValue,
                end: endValue,
                scrub: true,
                pin: true,
            }
        })

        videoRef.current.onloadeddata = () => {
            tl.to(videoRef.current, {
                currentTime: videoRef.current.duration
            })
        }
    })

    return (
        <>
            <section id='hero' className='noisy'>
                <h1 className='title'>Smoothy</h1>

                <img  src='/images/hero-right-leaf.png'
                      alt='right-leaf'
                      className='right-leaf'/>
                <img  src='/images/hero-left-leaf.png'
                      alt='left-leaf'
                      className='left-leaf'/>

                <div className='body'>
                    <div className='content'>
                        <div className='space-y-5 hidden md:block'>
                            <p>Refresh. Cool. Classic</p>
                            <p className='subtitle'>
                                Smoothy , sip the spirit <br/> of the Summer.
                            </p>
                        </div>
                        <div className='view-cocktails'>
                            <p className='subtitle'>
                                Inspired by the timeless flavors of the Nile Valley,
                                our refreshing blends combine traditional Egyptian
                                ingredients like hibiscus, mint, and citrus with
                                modern mixology. Each sip captures the essence of
                                Cairo's vibrant café culture
                            </p>
                            <a href='#cocktails'>View Cocktails</a>
                        </div>
                    </div>
                </div>
            </section>
            <div className='video absolute inset-0'>
                <video
                    src='/videos/output.mp4'
                    muted
                    playsInline
                    preload='auto'
                    ref={videoRef}
                />
            </div>
        </>
    )
}

export default Hero
