import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import './index.css'

import Layout from './testComponents/Layout'
import Song from './testComponents/Song'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/auth" element={<Auth/>} />
      <Route path="/songs" element={<Layout/>}>
        <Route path='/songs/:id' element={<Song/>}/>
        <Route path='/songs/new' element={<Song isNew={true}/>}/>
      </Route>
      <Route path="*" element={<NotFound/>} />
    </Routes>
  </BrowserRouter>
)

