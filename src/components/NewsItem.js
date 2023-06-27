import React from 'react'

const NewsItem =(props)=> {
  
  
    let {title , description , imageUrl , newsUrl , publishedAt , author , source } = props; 

    return (
      <div  className='my-3'>
        <div className="card" style={{width: '18rem'}}>

        <div>
        <span className="badge rounded-pill bg-danger" style={{right:'0' ,zIndex:'1',position:'absolute',display:'flex'}}>{source}
          </span>
        </div>
        
        <img src={!imageUrl?"https://i.cbc.ca/1.6752400.1676682098!/cpImage/httpImage/image.jpg_gen/derivatives/16x9_620/emirates-elon-musk.jpg":imageUrl}className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title"> {title}...
          </h5>
          <p className="card-text">{description}...</p>

          <p><small className="text-muted">By {author?author:"Unknown"} on {new Date(publishedAt).toDateString()}</small></p>

          <a href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
       
      </div>
    )
  
}

export default NewsItem