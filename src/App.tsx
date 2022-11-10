import React, { useState } from 'react';
import './App.css';

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { Routes, Route, Outlet, Link } from 'react-router-dom';

i18next.use(LanguageDetector).init().then();

import Home from './Component/Home';

function App() {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<Home />}></Route>
                <Route path="/about" element={<>caca</>} />
            </Route>
        </Routes>
    );
}

export default App;
