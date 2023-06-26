import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import axios from 'axios';
import ProductList from './components/ProductList';
import AboutUs from './components/AboutUs';
import Notifications from './components/Notifications';
import Input from './components/Input';

const UserRoleContext = createContext();

function UserRoleToggle({ setUserRole }) {
  const { userRole } = useContext(UserRoleContext);

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        id="userRoleToggle"
        checked={userRole === 'admin'}
        onChange={() => setUserRole(userRole === 'user' ? 'admin' : 'user')}
      />
      <label className="form-check-label" htmlFor="userRoleToggle">
        Admin
      </label>
    </div>
  );
}

function App() {
  const [userRole, setUserRole] = useState('user');
  const [products, setProducts] = useState([]);

  

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole }}>
      <div className="app-container">
        <div className="top" />

        <Router>
          <div className="navbar">
            <div>
              <h1 className="title">Webshop</h1>
            </div>

            <Link to="/" className="nav-btn">
              About us
            </Link>
            <Link to="/list" className="nav-btn">
              List
            </Link>

            <Link to="/notifications" className="nav-btn">
              Notifications
            </Link>
            <Link to="/input" className="nav-btn">
              Input
            </Link>

            <UserRoleToggle setUserRole={setUserRole} />
          </div>

          <Routes>
            <Route path="/" element={<AboutUs />} />
            <Route path="/list" element={<ProductList userRole={userRole} />} />
            <Route path="/notifications" element={<Notifications userRole={userRole} />} />
            <Route
              path="/input"
              element={
                userRole === 'admin' ? (
                  <Input add={setProducts} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          </Routes>
        </Router>
      </div>
    </UserRoleContext.Provider>
  );
}

export default App;
