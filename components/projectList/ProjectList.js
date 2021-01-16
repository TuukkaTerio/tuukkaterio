import { useContext } from 'react'
import ProjectContext from '../../contexts/ProjectContext'
import Project from '../project/Project'
import styles from './ProjectList.module.scss'

export const ProjectList = () => {
    const { projects } = useContext(ProjectContext);

    return (
        <div className={ styles.projectList }>
            { projects.length > 0
                ? projects.map((project, i) => (
                    <Project
                        title={ project.fields.title }
                        slug={ project.fields.slug.en }
                        thumbnail={ project.fields.thumbnail }
                        images={ project.fields.images }
                        richText={ project.fields.richText }
                        links={ project.fields.links }
                        key={ i }
                    />
                ))
            : null }
        </div>
    )
}
  
export default ProjectList