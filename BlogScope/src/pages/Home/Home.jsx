import React from 'react'
import { Outlet } from 'react-router-dom'
import Hero from './HeroSections/Hero'
import WhyChooseUs from './WhyChooseUs/WhyChooseUs'
import ContentFeed from './ContentFeed/ContentFeed'
import PopularCategories from './PopularCategories/PopularCategories'
import Testimonials from './Testonomial/Testonomial'
import CallToAction from "../../pages/Home/CallToAction/CallToAction"

const Home = () => {
  return (
   <>
  
    <Hero />
    <WhyChooseUs />
    <ContentFeed />
    <PopularCategories />
    <Testimonials />
    <CallToAction />
    <main>
        <Outlet />
      </main>
      


   </>
  )
}

export default Home