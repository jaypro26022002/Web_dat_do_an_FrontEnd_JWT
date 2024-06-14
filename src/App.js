import './App.scss';
import NavAdmin from './components/Navigation/NavAdmin';
import NavWeb from './components/Navigation/NavWeb';
import { BrowserRouter as Router, } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './routes/AppRoutes';
import CartRouter from './CartRouter';


function App() {

  return (
    <>
      <Router>
        <div>
          <div className='app-header'>
            <NavAdmin /> <NavWeb />
          </div>
          <div className='app-container'>
            <AppRoutes />
          </div>
        </div>
      </Router>


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


