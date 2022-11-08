import React from 'react';
import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";
import 'jquery/dist/jquery.min.js'
import "bootstrap/dist/js/bootstrap.js";

import {DrawerAppBar, Camera, FishInformation} from './Component';

function App() {
    return (
        <>
            {/* PARTIE 1 */}
            <DrawerAppBar/>

            {/* PARTIE 2: Caméra */}
            <Camera/>

            {/* PARTIE 3: Informations poisson */}
            <FishInformation/>
        </>
    );
}

export default App;
