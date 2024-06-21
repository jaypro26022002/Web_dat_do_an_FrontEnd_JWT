import './App.scss';
import NavAdmin from './components/Navigation/NavAdmin';
import NavWeb from './components/Navigation/NavWeb';
import NavWebLogin from './components/Navigation/NavWebLogin';
import { BrowserRouter as Router, } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './routes/AppRoutes';
import { useEffect, useState, useContext } from 'react';
import { Rings } from 'react-loader-spinner';
import { UserContext } from './context/UserContext';

function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Router>
        {user && user.isLoading ?
          <div className='loading-container'>
            <Rings
              heigth='100'
              width='100'
              color='#1877f2'
              ariaLabel='loading'
            />
            <div>Loading data...</div>
          </div>
          :
          <>
            <div className='app-header'>
              <NavAdmin /> <NavWeb /> <NavWebLogin />
            </div>
            <div className='app-container'>
              <AppRoutes />
            </div>
          </>
        }

      </Router >

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;


