import './App.css';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Nav from './Components/Navbar/Navbar';
import { Router } from 'express';
import { Route, Routes } from 'react-router-dom';
import CreateCategory from './Components/Add-category/Add-category';
import Createlivre from './Components/Add-Livre/Add-livre';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/bibliotheque' element={<Bibliotheque />} />
          <Route path='/add-category' element={<CreateCategory />} />
          <Route path='/add-livre' element={<Createlivre />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
