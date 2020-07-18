import { useContext } from 'react'
import LanguageContext from '../../contexts/LanguageContext'
import Translation from '../translation/Translation'
import styles from './LanguageSwitcher.module.scss'

const LanguageSwitcher = () => {
    const { language, setLanguage } = useContext(LanguageContext);
    const toggleLanguage = (language === 'sv') ? 'en' : 'sv';

    return (
        <button className={styles.languageSwitcher} onClick={ () => setLanguage(toggleLanguage) }>
            <span>
                <Translation text={ {
                    en: 'Svenska',
                    sv: 'English',
                } }/>
            </span>
        </button>
    )
}

export default LanguageSwitcher;