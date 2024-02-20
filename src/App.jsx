import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { fetchDataFromApi } from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration, getGenres } from './store/HomeSlice.js'

import Header from './components/header/header.jsx'
import Footer from './components/footer/footer.jsx'
import Home from './pages/Home/Home.jsx'
import Details from './pages/details/Details.jsx'
import SearchResult from './pages/searchResult/SearchResult.jsx'
import Explore from "./pages/explore/Explore.jsx"
import PageNotFound from "./pages/404/pageNotFound.jsx"



function App() {
  const dispatch = useDispatch()
  const { url } = useSelector(state => state.home)

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration")
      .then(res => {
        // console.log(res);

        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        }
        dispatch(getApiConfiguration(url))
      })
  }

  useEffect(() => {
    fetchApiConfig()
    genresCall()
  }, [])


  const genresCall = async () => {
    let promises = []
    let endPoints = ["tv", "movie"]
    let allGenres = {}

    endPoints.forEach(url => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    let data = await Promise.all(promises)
    data.map(({ genres }) => {
      return genres.map(item => allGenres[item.id] = item)
    })

    dispatch(getGenres(allGenres))
  }



  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
