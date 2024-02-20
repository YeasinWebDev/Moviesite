import React from 'react'
import "./style.scss"
import HeroBanner from './heroBanner/HeroBanner'
import Footer from '../../components/footer/footer'
import Trending from './trending/Trending'
import Popular from './popular/popular'
import TopRated from './topRated/TopRated'


 export default function Home() {
  return (
    <div className='homePage'>
      <HeroBanner />
      <Trending/>
      <Popular/>
      <TopRated/>
      <Footer />
    </div>
  )
}

