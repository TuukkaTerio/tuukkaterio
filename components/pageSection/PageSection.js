// --------------------------------------------------------------
// Libraries
// --------------------------------------------------------------

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import classnames from 'classnames';

// --------------------------------------------------------------
// Styles
// --------------------------------------------------------------

import styles from './PageSection.module.scss';

export const PageSection = ({ 
    title,
    id,
    slug,
    richText,
    media 
  }) => {
    
    return (
      <div 
        className={ getStyles(styles, id) }
        id={ slug } 
        >
        <p>{id}</p>
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
    <h2>{ title }</h2>
  ) : null
}

const PageSectionRichText = ({ visible, richText }) => {
  return visible ? (
    documentToReactComponents(richText)
  ) : null
}