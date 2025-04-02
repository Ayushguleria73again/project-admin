import React from 'react'
import Uploadform from './assets/Uploadform'
import { Route ,Routes } from 'react-router-dom'
import Tabel from './assets/Tabel'
import Edit from './assets/Edit'
import User from './assets/User'

function App() {
  return (
    <>
    <Routes>
      <Route path='/upload' element={<Uploadform/>}/>
      <Route path='/products' element={<Tabel/>} />
      <Route path='/update/:id' element={<Edit/>} />
      <Route path='/' element={<User/>}/>
    </Routes>
    
    </>
  )
}

export default App