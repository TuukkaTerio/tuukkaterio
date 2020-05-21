import { useEffect, useState } from 'react'
import Head from 'next/head'
import PageSection from '../components/pageSection'
import Project from '../components/project'

const client = require('contentful').createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})

function HomePage() {
  async function fetchEntries(type) {
    const entries = await client.getEntries({
      content_type: type,
    });
    if (entries.items) return entries.items
    console.log(`Error getting Entries for ${ contentType.name }.`)
  }

  const [pageSections, setPageSections] = useState([])
  const [projects, setProjects] = useState([])

  useEffect(() => {
    async function getPageSections() {
      const allPageSections = await fetchEntries('pageSection')
      setPageSections([...allPageSections])
    }
    async function getProjects() {
      const allProjects = await fetchEntries('project')
      setProjects([...allProjects])
    }
    getPageSections()
    getProjects()
  }, [])

  return (
    <>
      <Head>
        <title>Next.js + Contentful</title>
        <link
          rel="stylesheet"
          href="https://css.zeit.sh/v1.css"
          type="text/css"
        />
      </Head>
      { pageSections.length > 0
        ? pageSections.map((pageSection, i) => (
            <PageSection
              title={ pageSection.fields.title }
              id={ pageSection.fields.id }
              slug={ pageSection.fields.slug }
              richText={ pageSection.fields.richText }
              media={ pageSection.fields.media }
              key={ i }
            />
          ))
        : null }
      { projects.length > 0
        ? projects.map((project, i) => (
            <Project
              title={ project.fields.title }
              slug={ project.fields.slug }
              media={ project.fields.media }
              description={ project.fields.description }
              linkGitHub={ project.fields.linkGitHub }
              linkLive={ project.fields.linkLive }
              order={ project.fields.order }
              key={ i }
            />
          ))
        : null }
    </>
  )
}

export default HomePage