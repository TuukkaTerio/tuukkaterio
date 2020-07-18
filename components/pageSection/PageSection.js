import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import classnames from 'classnames'
import Translation from '../translation/Translation'
import styles from './PageSection.module.scss'

export const PageSection = ({ 
    title,
    id,
    slug,
    richText,
    media 
  }) => {
    
    return (
      <div 
        className={ getStyles(styles, id.en) }
        id={ slug }
        >
        <PageSectionTitle
          visible={ isSet(title) }
          title={ title }
        />
        <PageSectionRichText
          visible={ isSet(richText) }
          richText={ richText }
        />
      </div>
    )
}
  
export default PageSection

// --------------------------------------------------------------
// Helpers
// --------------------------------------------------------------

function isSet(value) {
  return value !== null && value !== undefined && value !== '';
}

function getStyles(styles, id) {
  return classnames(
      styles.pageSection,
      {[styles.pageSectionIntroduction]: id === 'introduction'},
      {[styles.pageSectionAbout]: id === 'about'},
      {[styles.pageSectionExperience]: id === 'experience'},
      {[styles.pageSectionContact]: id === 'contact'},
  )
}

// --------------------------------------------------------------
// Subcomponents
// --------------------------------------------------------------

const PageSectionTitle = ({ visible, title }) => {
  return visible ? (
    <h2>
      <Translation text={ title } />
    </h2>
  ) : null
}

const PageSectionRichText = ({ visible, richText }) => {
  return visible ? (
    <Translation text={{ sv: documentToReactComponents(richText.sv), en: documentToReactComponents(richText.en) }} />
  ) : null
}