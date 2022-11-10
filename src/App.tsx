import React, { useState } from 'react';
import './App.css';

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next.use(LanguageDetector).init().then();

import Main from './Component/Main';

function App() {
    return (
        <>
            <Main />
        </>
    );
}

export default App;
