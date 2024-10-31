import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Footer from './Components/Footer'
import NewsCategory from './Components/NewsCategory'
import NewsCard from './Components/NewsCard'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Hero />} />
          <Route path='/national' element={<NewsCategory category="national" />} />
          <Route path='/global' element={<NewsCategory category="global" />} />
          <Route path='/politics' element={<NewsCategory category="politics" />} />
          <Route path='/technologies' element={<NewsCategory category="technologies" />} />
          <Route path='/sports' element={<NewsCategory category="sports" />} />
          <Route path='/business' element={<NewsCategory category="business" />} />
          <Route path='/health' element={<NewsCategory category="health" />} />
          <Route path='/entertainment' element={<NewsCategory category="entertainment" />} />
          <Route path='/news' element={<NewsCard />}>
            <Route path=':newsId' element={<NewsCard />} ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App
