import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './pages/Main';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/auth" element={<Auth/>} />
      <Route path="/songs" element={<Main/>} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
  </BrowserRouter>
)

