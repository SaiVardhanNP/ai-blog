import React from 'react'
import Navbar from '../components/Navbar'
import { assets } from '../assets/assets'
import Header from '../components/Header'
import Search from '../components/Search'
import BlogList from '../components/BlogList'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      {/* <Search/> */}
      <BlogList/>
      <NewsLetter/>
      <Footer/>
    </div>
  )
}

export default Home
