"use client"

import { heroVideo, smallHeroVideo } from "@/utils"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useEffect, useState } from "react"


const Hero = () => {
  const [videoSrc, setVideoSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    const isDesktop = window.innerWidth > 768;
    setVideoSrc(isDesktop ? heroVideo : smallHeroVideo);
  }, []);

  const handleVideoSrcSet = () => {
    if(window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo)
    } else {
      setVideoSrc(heroVideo)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleVideoSrcSet);

    return () => {
      window.removeEventListener('reisze', handleVideoSrcSet)
    }
  }, [])

  useGSAP(() => {
    gsap.to('#hero', { opacity: 1, delay: 1.5 })
    gsap.to('#cta', { opacity: 1, y: -50, delay: 2 })
  }, [])
  return (
    <section className="w-full nav-height bg-black relative">
        <div className="h-5/6 w-full flex items-center justify-center flex-col">
         <p id="hero" className="hero-title">IPhone 15 Pro</p>
         <div className="md:w-10/12 w-9/12">
            <video className="" autoPlay muted playsInline={true} key={videoSrc} >
              <source src={videoSrc} type="video/mp4" />
            </video>
         </div>   
        </div>

        <div
        id="cta"
        className="flex flex-col items-center opacity-0 translate-y-20"
      >
        <a href="#highlights" className="btn">Buy</a>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  )
}

export default Hero