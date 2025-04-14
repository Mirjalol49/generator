import React from 'react'
import Products from './Products/Products'
import HeroSection from '../../Components/HeroSection/HeroSection'
import Footer from '../../Components/Footer/Footer'
import AboutSection from '../../Components/AboutSection/AboutSection'
import ContactSection from '../../Components/ContactSection/ContactSection'
const Main = () => {
  return (
    <main>
      <HeroSection />
      <Products />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

export default Main
