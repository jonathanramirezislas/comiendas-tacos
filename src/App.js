import React from 'react'
import {Routes, Route} from 'react-router'
import './styles/main.css'
import { Ordenes } from './components/pages/Ordenes';

 const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Ordenes />} />
      </Routes>
      
    </div>
  )
}
export default App;
