import React from 'react'
import {cocktailLists, mockTailLists} from "../../constants/index.js";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

function Cocktails() {
    useGSAP(()=>{
        const parallexTimeline = gsap.timeline({
            scrollTrigger:{
                trigger: "#cocktails",
                start:"top 30%",
                end:"bottom 80%",
                scrub:true
            }
        })
        parallexTimeline
            .from('#c-left-leaf',{
                x: -100, y:100
            })
            .from('#c-right-leaf',{
                x:100, y:100
            })
    })
    return (
        <section id='cocktails' className='noisy'>
            <img
                src='/images/cocktail-left-leaf.png'
                alt='left-leaf'
                id='c-left-leaf'
            />
            <img
                src='/images/cocktail-right-leaf.png'
                alt='right-leaf'
                id='c-right-leaf'
            />

            <div className='list'>
                <div className='popular'>
                    <h2>Most Popular Drinks</h2>
                    <ul>
                        {cocktailLists.map((drink)=>(
                            <li key={drink.name}>
                                <div className='md:me-28'>
                                    <h3>{drink.name}</h3>
                                    <p>{drink.country} | {drink.detail}</p>
                                </div>
                                <span>{drink.price}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='loved'>
                    <h2>Most loved mocktails</h2>
                    <ul>
                        {mockTailLists.map((drink)=>(
                            <li key={drink.name}>
                                <div className='md:me-28'>
                                    <h3>{drink.name}</h3>
                                    <p>{drink.country} | {drink.detail}</p>
                                </div>
                                <span>{drink.price}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Cocktails
