import { isSet } from '../../helpers/IsSet'
import styles from './PageNavigation.module.scss'
import Translation from '../translation/Translation'

export const PageNavigation = ({
    pageSections
  }) => {
    let pageSectionsWithoutIntroduction = null;

    if(isSet(pageSections)) {
        pageSectionsWithoutIntroduction = pageSections.slice(1, pageSections.length);
    }

    return isSet(pageSectionsWithoutIntroduction) ? (
        <nav className={ styles.pageNavigation }>
            <ul className={ styles.pageNavigationList }>
                { pageSectionsWithoutIntroduction.map((pageSection, i) => (
                    <li 
                        className={ styles.pageNavigationListItem } 
                        key={i}>
                        <a href={ '#' + pageSection.fields.id.en }>
                            <Translation text={ pageSection.fields.title } />
                        </a>
                    </li>
                )) }
            </ul>
        </nav>
    ) : null
}
  
export default PageNavigation