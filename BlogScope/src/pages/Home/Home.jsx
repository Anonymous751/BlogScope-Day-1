import React from 'react'
import { Outlet } from 'react-router-dom'
import Hero from './HeroSections/Hero'
import WhyChooseUs from './WhyChooseUs/WhyChooseUs'
import ContentFeed from './ContentFeed/ContentFeed'
import PopularCategories from './PopularCategories/PopularCategories'
import Testimonials from './Testonomial/Testonomial'

const Home = () => {
  return (
   <>
  
    <Hero />
    <WhyChooseUs />
    <ContentFeed />
    <PopularCategories />
    <Testimonials />
    <main>
        <Outlet />
      </main>
      


   </>
  )
}

export default Home