import { useState } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import classnames from 'classnames'
import FocusTrap from 'focus-trap-react';
import Translation from '../translation/Translation'
import styles from './Project.module.scss'
import { isSet } from '../../helpers/IsSet'
import { disableScroll } from '../../helpers/DisableScroll'
import RelatedLinks from '../relatedLinks/RelatedLinks'

export const Project = ({
    title,
    slug,
    thumbnail,
    images,
    richText,
    links
  }) => {
  
  const [projectIsActiveState, setProjectIsActiveState] = useState(false);

  return (
    <div 
      id={ slug } 
      className={ classnames(
        styles.project,
        { [styles.projectIsActive]: projectIsActiveState }
      ) }>
      <button
        aria-expanded={ projectIsActiveState }
        onClick={ () => {
          toggleProjectIsActiveState(projectIsActiveState, setProjectIsActiveState);
        }}>
        <ProjectThumbnail
          visible={ isSet(thumbnail) }
          thumbnail={ thumbnail }
        />
        <ProjectButtonText
          visible={ isSet(title) }
          title={ title }
        />
      </button>
      <FocusTrap active={ projectIsActiveState }>
        <div className={ styles.projectOverlay } aria-hidden={ !projectIsActiveState }>
          <div className={ styles.projectOverlayInnerWrapper }>
            <ProjectTitle
              visible={ isSet(title) }
              title={ title }
            />
            <ProjectRichText 
              visible={ isSet(richText) }
              richText={ richText }
            />
            <ProjectImages
              visible={ isSet(images) }
              images={ images.en }
            />
            <ProjectRelatedLinks
              visible={ isSet(links) }
              links={ links }
            />
            <button 
              aria-expanded={ projectIsActiveState }
              onClick={ () => {
                toggleProjectIsActiveState(projectIsActiveState, setProjectIsActiveState);
              }}>
                X
              </button>
          </div>
        </div>
      </FocusTrap>
    </div>
  )
}
  
export default Project

// --------------------------------------------------------------
// Helpers
// --------------------------------------------------------------

function toggleProjectIsActiveState(projectIsActiveState, setProjectIsActiveState) {
  if(projectIsActiveState) {
    setProjectIsActiveState(false);
    disableScroll(false);
  } else {
    setProjectIsActiveState(true);
    disableScroll(true);
  }
};

// --------------------------------------------------------------
// Subcomponents
// --------------------------------------------------------------

const ProjectThumbnail = ({ visible, thumbnail }) => {
  return visible ? (
    <img src={ thumbnail.en.fields.file.en.url } alt={ thumbnail.en.fields.title.en } />
  ) : null
}

const ProjectButtonText = ({ visible, title }) => {
  return visible ? (
    <p className={ styles.projectButtonText }>
      <Translation text={ title } />
    </p>
  ) : null
}

const ProjectTitle = ({ visible, title }) => {
  return visible ? (
    <h3 className={ styles.projectTitle }>
      <Translation text={ title } />
    </h3>
  ) : null
}

const ProjectRichText = ({ visible, richText }) => {
  return visible ? (
    <Translation text={{ sv: documentToReactComponents(richText.sv), en: documentToReactComponents(richText.en) }} />
  ) : null
}

const ProjectImages = ({ visible, images }) => {
  return visible ? (
    <div className={ styles.projectImages }>
      { images.map((image, i) => (
        <img key={ i } src={ image.fields.file.en.url } alt={ image.fields.title.en } />
      )) }
    </div>
  ) : null
}

const ProjectRelatedLinks = ({ visible, links }) => {
  return visible ? (
    <RelatedLinks
      links={ links.en }
    />
  ) : null
}