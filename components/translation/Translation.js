import { useContext } from 'react'
import LanguageContext from '../../contexts/LanguageContext'

const Translation = ({ text }) => {
    const { language } = useContext(LanguageContext);

    if (text.hasOwnProperty(language)) {
        return text[language];
    }

    for (var translation in text) {
        return translation;
    }

    return null;
}

export default Translation;