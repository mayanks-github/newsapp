import React from 'react'

const NewsItem = (props)=> {
  let {title, description, imageUrl, newsUrl, author, date, source} = props;
  return (
    <div >
      <div className="card">
        <div style={{display:'flex', justifyContent:'center', position: 'absolute', right: 0}}>
          <span class="badge rounded-pill bg-danger">{source}</span>
        </div>
        <img src={imageUrl} className="card-img-top" alt="..." style={{height:"200px"}}/>
        <div className="card-body">
            <h5 className="card-title">{title.slice(0, 60)}...</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">By {author? author : "Unknown" } on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrence" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
        </div>
      </div>
    </div>
  )
}

export default NewsItem