import { useContext } from 'react'
import { write } from '../../helpers/Storage';
import LanguageContext from '../../contexts/LanguageContext'
import Translation from '../translation/Translation'
import styles from './LanguageSwitcher.module.scss'

const LanguageSwitcher = () => {
    const { language, setLanguage } = useContext(LanguageContext);
    const toggleLanguage = (language === 'sv') ? 'en' : 'sv';

    return (
        <button 
            className={ styles.languageSwitcher } 
            lang={ toggleLanguage } 
            onClick={ () => {
                // Store in sessionStorage
                write('storedLanguage', toggleLanguage);
                // Update the LanguageContext
                setLanguage(toggleLanguage);
            }}>
            <span>
                <Translation text={ {
                    en: 'Svenska',
                    sv: 'English'
                } }/>
            </span>
        </button>
    )
}

export default LanguageSwitcher;