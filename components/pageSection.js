function PageSection({ title, id, slug, richText, media }) {
    return (
      <div id={ slug }>
        <h2>{ title }</h2>
        <p>ID: { id }</p>
      </div>
    )
}
  
export default PageSection