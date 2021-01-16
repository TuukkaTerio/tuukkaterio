import { useEffect, useState, useContext } from 'react'
import { read } from '../helpers/Storage';

import PageNavigation from '../components/pageNavigation/PageNavigation'
import PageSection from '../components/pageSection/PageSection'

import LanguageContext from '../contexts/LanguageContext';
import ProjectContext from '../contexts/ProjectContext';
import LanguageSwitcher from "../components/languageSwitcher/LanguageSwitcher";

const client = require('contentful').createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})

function HomePage() {
  async function fetchEntries(type) {
    const entries = await client.getEntries({
      content_type: type,
      locale: '*'
    });
    if (entries.items) return entries.items
    console.log(`Error getting Entries for ${ contentType.name }.`)
  }

  let [pageSections, setPageSections] = useState([])
  let [projects, setProjects] = useState([])

  let storedLanguage = read('storedLanguage');
  let [language, setLanguage] = useState( storedLanguage !== null ? storedLanguage : 'en' );

  useEffect(() => {
    async function getPageSections() {
      const allPageSections = await fetchEntries('pageSection')
      allPageSections.sort(function(a, b) {
        return a.fields.order.en - b.fields.order.en;
      })
      setPageSections([...allPageSections])
    }

    async function getProjects() {
      const allProjects = await fetchEntries('project')
      allProjects.sort(function(a, b) {
        return a.fields.order.en - b.fields.order.en;
      })
      setProjects([...allProjects])
    }

    getPageSections()
    getProjects()
  }, [])

  console.dir(pageSections);
  console.dir(projects);

  return (
    <LanguageContext.Provider value={ { language, setLanguage } }>
      <LanguageSwitcher/>
      <PageNavigation pageSections={ pageSections }/>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <ProjectContext.Provider value={ { projects, setProjects } }>
          { pageSections.length > 0
            ? pageSections.map((pageSection, i) => (
              <PageSection
                title={ pageSection.fields.title }
                id={ pageSection.fields.id.en }
                slug={ pageSection.fields.slug.en }
                richText={ pageSection.fields.richText }
                media={ pageSection.fields.media }
                links={ pageSection.fields.links }
                key={ i }
              />
            ))
          : null }
        </ProjectContext.Provider>
      </div>
    </LanguageContext.Provider>
  )
}

export default HomePage