function Project({ title, slug, media, description, linkGitHub, linkLive, order }) {
    return (
      <div id={ slug }>
        <h2>{ title }</h2>
        <p>Order: { order }</p>
        <a href={ linkGitHub }>{ linkGitHub }</a>
        <a href={ linkLive }>{ linkLive }</a>
      </div>
    )
}
  
export default Project