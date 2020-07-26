import { useState } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import classnames from 'classnames'
import Translation from '../translation/Translation'
import styles from './Project.module.scss'
import { isSet } from '../../helpers/isSet/IsSet'

export const Project = ({
    title,
    slug,
    thumbnail,
    images,
    richText,
    linkGitHub,
    linkLive
  }) => {
  
  const [projectState, setProjectState] = useState(false);

  return (
    <div 
      id={ slug } 
      onClick={ () => {
        toggleProject(projectState, setProjectState);
      }}
      className={ classnames(styles.project, { [styles.projectActive]: projectState }) }
      >
      <ProjectThumbnail
        visible={ isSet(thumbnail) }
        thumbnail={ thumbnail }
      />
      <div className={ styles.projectOverlay }>
        <ProjectTitle
          visible={ isSet(title) }
          title={ title }
        />
        <div className={ styles.projectOverlayInnerWrapper }>
          <ProjectRichText 
            visible={ isSet(richText) }
            richText={ richText }
          />
          <ProjectImages
            visible={ isSet(images) }
            images={ images.en }
          />
          <ProjectLink
            styles={ styles }
            visible={ isSet(linkGitHub) }
            linkName={ linkGitHub }
            linkTarget={ linkGitHub }
            isGithub={ true }
          />
          <ProjectLink
            styles={ styles }
            visible={ isSet(linkLive) }
            linkName={ linkLive }
            linkTarget={ linkLive }
            isGithub={ false }
          />
        </div>
      </div>
    </div>
  )
}
  
export default Project

// --------------------------------------------------------------
// Helpers
// --------------------------------------------------------------

function toggleProject(projectState, setProjectState) {
  if(projectState) {
    setProjectState(false);
  } else {
    setProjectState(true);
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
    <div>
      { images.length > 0
      ? images.map((image, i) => (
        <img key={ i } src={ image.fields.file.en.url } alt={ image.fields.title.en } />
        ))
      : null }
    </div>
  ) : null
}

const ProjectLink = ({ styles, visible, linkName, linkTarget, isGithub }) => {
  return visible ? (
    <a 
      className={ classnames(styles.projectLink, {[styles.projectLinkGithub]: isGithub}) }
      href={ linkTarget }>
        <span>{ linkName }</span>
      </a>
  ) : null
}