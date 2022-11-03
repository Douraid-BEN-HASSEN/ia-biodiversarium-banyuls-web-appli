import React from 'react';
import ReactDOM from 'react-dom/client';
import TestImage from "./Zoom/resize_img";
import './index.css';

import { Col, Row } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import 'jquery/dist/jquery.min.js'
import "bootstrap/dist/js/bootstrap.js";

import { Menu, Camera, FishInformation } from './Component';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>    
    {/* PARTIE 1 */}
    <Menu/>
    <TestImage />
    {/* PARTIE 2: Caméra */}
    <Camera/>

    {/* PARTIE 3: Informations poisson */}
    <FishInformation/>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
