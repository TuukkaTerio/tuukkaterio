import classnames from 'classnames'
import { isSet } from '../../helpers/IsSet'
import styles from './RelatedLinks.module.scss'

export const RelatedLinks = ({
    links
  }) => {
    return isSet(links) ? (
        <ul className={ styles.relatedLinks }>
            { links.map((link, i) => (
                <li key={i}>
                    <a 
                        href={ link.fields.url.en }
                        className={ getStyles(link.fields.type.en) }>
                        { link.fields.title.en }
                    </a>
                </li>
            )) }
        </ul>
    ) : null
}
  
export default RelatedLinks

// --------------------------------------------------------------
// Helpers
// --------------------------------------------------------------

function getStyles(type) {
    return classnames(
        styles.relatedLinksLink,
        {[styles.relatedLinksLinkInstagram]: type === 'Instagram'},
        {[styles.relatedLinksLinkLinkedIn]: type === 'LinkedIn'},
        {[styles.relatedLinksLinkGitHub]: type === 'GitHub'},
        {[styles.relatedLinksLinkWebpage]: type === 'Webpage'}
    )
}