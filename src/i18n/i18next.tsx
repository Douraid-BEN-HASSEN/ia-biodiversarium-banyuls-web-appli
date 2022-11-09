/**
 * @author Alexis DEVLEESCHAUWER <alexis@devleeschauwer.fr>
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Language } from './Language';
import translationEN from './translation/en.json';
import translationFR from './translation/fr.json';
import translationCA from './translation/ca.json';

const defaultLanguage = Language.FR;

const translations = {
    en: {
        translation: translationEN,
    },
    fr: {
        translation: translationFR,
    },
    ca: {
        translation: translationCA,
    },
};

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: translations,
        lng: defaultLanguage,
        fallbackLng: Object.values(Language),
        keySeparator: '.',
        saveMissing: true,
        interpolation: {
            escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
    });

export default i18n;
