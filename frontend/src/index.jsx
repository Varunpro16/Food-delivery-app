import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { CookiesProvider } from "react-cookie";

import GoogleMapNew from './components/GoogleMapNew';
import Adduser from './components/Adduser';
import DriverLogin from './components/DriverLogin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
    {/* <GoogleMapNew/> */}
    {/* <Adduser/> */}
    {/* <DriverLogin /> */}
  </React.StrictMode>
);

