import { createContext } from 'react'

const LanguageContext = createContext({
    language: 'sv',
    setLanguage: () => {}
});

export const LanguageProvider = LanguageContext.Provider;
export const LanguageConsumer = LanguageContext.Consumer;
export default LanguageContext;