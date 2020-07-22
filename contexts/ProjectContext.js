import { createContext } from 'react'

const ProjectContext = createContext({
    projects: [],
    setProjects: () => {}
});

export const LanguageProvider = ProjectContext.Provider;
export const LanguageConsumer = ProjectContext.Consumer;
export default ProjectContext;