import React from 'react';
import './App.css';

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { Routes, Route } from 'react-router-dom';

i18next.use(LanguageDetector).init().then();

import Home from './Component/Home';
import About from './Component/About';

function App() {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<Home />}></Route>
                <Route path="/about" element={<About />} />
            </Route>
        </Routes>
    );
}

export default App;
