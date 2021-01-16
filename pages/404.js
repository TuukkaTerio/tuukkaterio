import Translation from '../components/translation/Translation'
import Link from 'next/link'

export default function PageNotFound() {
    return (
        <>
            <h1>
                <Translation text={ {
                    en: '404 - Page Not Found :(',
                    sv: '404 - Sidan kunde inte hittas :('
                } }/>
            </h1>
            <Link href="/">
                <a>
                    <Translation text={ {
                        en: 'Go back to the start page',
                        sv: 'Gå tillbaka till startsidan'
                    } }/>
                </a>
            </Link>
        </>
    )
}