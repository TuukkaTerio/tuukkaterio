// --------------------------------------------------------------
// Libraries
// --------------------------------------------------------------

import { useEffect, useState } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import classnames from 'classnames';

// --------------------------------------------------------------
// Styles
// --------------------------------------------------------------

import styles from './Project.module.scss';

export const Project = ({
    title,
    slug,
    media,
    richText,
    linkGitHub,
    linkLive,
    projectOrder
  }) => {
  
  const [projectState, setProjectState] = useState(false);

  return (
    <div 
      id={ slug } 
      onClick={ () => {
        toggleProject(projectState, setProjectState);
      }}
      className={ classnames(styles.project, { [styles.projectActive]: projectState }) }
      style={{ order: projectOrder }}
      >
      <p>{ projectOrder }</p>
      <ProjectTitle
        visible={ isSet(title) }
        title={ title }
      />
      <ProjectRichText 
        visible={ isSet(richText) }
        richText={ richText }
      />
      <ProjectMedia
        visible={ isSet(media) }
        media={ media }
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
  )
}
  
export default Project

// --------------------------------------------------------------
// Helpers
// --------------------------------------------------------------

function isSet(value) {
  return value !== null && value !== undefined && value !== '';
}

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

const ProjectTitle = ({ visible, title }) => {
  return visible ? (
    <h2>{ title }</h2>
  ) : null
}

const ProjectRichText = ({ visible, richText }) => {
  return visible ? (
    documentToReactComponents(richText)
  ) : null
}

const ProjectMedia = ({ visible, media }) => {
  return visible ? (
    <p>Media</p>
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