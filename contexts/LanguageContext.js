import { createContext } from 'react'
import { read } from '../helpers/Storage';

let storedLanguage = read('storedLanguage');

const LanguageContext = createContext({
    language: storedLanguage !== null ? storedLanguage : 'en',
    setLanguage: () => {}
});

export const LanguageProvider = LanguageContext.Provider;
export const LanguageConsumer = LanguageContext.Consumer;
export default LanguageContext;