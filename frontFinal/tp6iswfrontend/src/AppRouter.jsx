import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css'
import Inicio from './Components/Inicio.jsx'
import Dador from './Components/Dador.jsx';
import Transportista from './Components/Transportista.jsx'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/usuarios" element={<Dador/>} />
        <Route path="/transportista" element={<Transportista/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;