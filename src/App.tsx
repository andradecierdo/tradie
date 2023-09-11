import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { JobList } from './pages/JobList'
import { Job} from './pages/Job'
import { TradieJobsProvider } from './context/TradieJobsContext'

function App() {
  return (
    <TradieJobsProvider>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/jobs' Component={JobList} />
        <Route path='/jobs/:id' Component={Job} />
      </Routes>
    </TradieJobsProvider>
  )
}

export default App
