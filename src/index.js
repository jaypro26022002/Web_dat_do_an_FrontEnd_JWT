import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { UserProvider } from './context/UserContext';
import Context from './context_cart/Context';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <Context>
        <App />
      </Context>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root'));
reportWebVitals();
