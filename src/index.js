import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { UserProvider } from './context/UserContext';
import Context from './context_cart/Context';
import Context1 from './context_home/Context Com';
import Context2 from './context_home/Context KFC';
import Context3 from './context_home/Context Sushi';
import Context4 from './context_home/Context Bun';
import Context5 from './context_home/Context Sang';
import Context6 from './context_home/Context Trua';
import Context7 from './context_home/Context Toi';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <Context>
        <Context1>
          <Context2>
            <Context3>
              <Context4>
                <Context5>
                  <Context6>
                    <Context7>
                      <App />
                    </Context7>
                  </Context6>
                </Context5>
              </Context4>
            </Context3>
          </Context2>
        </Context1>
      </Context>
    </UserProvider>
  </React.StrictMode >,
  document.getElementById('root'));
reportWebVitals();
