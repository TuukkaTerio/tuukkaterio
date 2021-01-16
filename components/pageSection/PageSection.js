import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import classnames from 'classnames'
import Translation from '../translation/Translation'
import styles from './PageSection.module.scss'
import ProjectList from '../projectList/ProjectList'
import RelatedLinks from '../relatedLinks/RelatedLinks'
import { isSet } from '../../helpers/IsSet'

export const PageSection = ({ 
    title,
    id,
    slug,
    richText,
    media,
    links
  }) => {
    return (
      <>
        <div 
          className={ getStyles(styles, id) }
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
          <PageSectionMedia
            visible={ isSet(media) }
            media={ media }
          />
          <PageSectionProjectList 
            visible={ id === 'work' }
          />
          <PageSectionRelatedLinks
            visible={ isSet(links) }
            links={ links }
          />
        </div>
      </>
    )
}
  
export default PageSection

// --------------------------------------------------------------
// Helpers
// --------------------------------------------------------------

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

const PageSectionMedia = ({ visible, media }) => {
  let altText = null;
  return visible ? (
    <img src={ media.en.fields.file.en.url } alt={ media.en.fields.title.en }></img>
  ) : null
}

const PageSectionProjectList = ({ visible }) => {
  return visible ? (
    <ProjectList/>
  ) : null
}

const PageSectionRelatedLinks = ({ visible, links }) => {
  return visible ? (
    <RelatedLinks
      links={ links.en }
    />
  ) : null
}