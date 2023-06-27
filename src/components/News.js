import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResult] = useState(0);

  const UpdateNews = async () => {
    props.setProgress(0);
    // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1a7cf82b5c77455ca88ace06320a0b7d&page=${this.state.page} &pageSize=${this.props.pageSize}`

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1a7cf82b5c77455ca88ace06320a0b7d&page=${page} &pageSize=${props.pageSize}`;
    props.setProgress(30);
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    props.setProgress(90);
    setArticles(parsedData.articles);
    setLoading(false);
    setTotalResult(parsedData.totalResults);
    props.setProgress(100);
  };


  useEffect(() => {
    UpdateNews();
    // eslint-disable-next-line 
  },[]);


  //  handlePrevClick = async ()=>{
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=47e06f43033d4d72b6e3ffaca4d7c834&page=${this.props.page-1} &pageSize=${this.props.pageSize}`
  //   // this.setState({loading:true});
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();

  //   // this.setState({articles:parsedData.articles,
  //   //   totalResults:parsedData.totalResults,
  //   //   loading:false
  //   // })

  //   await this.setState({ page: this.state.page - 1 })
  //   this.UpdateNews();

  //  const handlePrevClick = async () => {
  //     setPage(page-1)
  //     updateNews();
  // }
  // }
  // }

  //  handleNextClick = async ()=>{
  //   // if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
  //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=47e06f43033d4d72b6e3ffaca4d7c834&page=${this.props.page+1} &pageSize=${this.props.pageSize}`
  //     // this.setState({loading:true});
  //     // let data = await fetch(url);
  //     // let parsedData = await data.json();

  //     // this.setState({articles:parsedData.articles,
  //     //   totalResults:parsedData.totalResults,
  //     //   loading:false
  //     // })

  //     // }
  //     await this.setState({ page: this.state.page + 1 });
  //   this.UpdateNews();

  //   const handleNextClick = async () => {
  //     setPage(page+1)
  //     updateNews()
  // }
  // }

  const fetchMoreData = async () => {
    
    // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1a7cf82b5c77455ca88ace06320a0b7d&page=${this.state.page} &pageSize=${this.props.pageSize}`
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1a7cf82b5c77455ca88ace06320a0b7d&page=${page+1} &pageSize=${props.pageSize}`;
    setPage(page + 1);
    //  setState({loading:true});

    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(articles.concat(parsedData.articles));
    setTotalResult(parsedData.totalResults);
  }

  return (
    <div className="container my-3 ">
      <h1 className="text-center " style={{marginTop:'90px'}}>NaradNEWS Top Headlines </h1>

      {loading && <Loading />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Loading />}
      >
        <div className="row">
          {articles.map((element, index) => {
            return (
              <div className="col-md-4" key={index}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 44) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={element.urlToImage}

                  // newsUrl={element.url}
                  author={element.author}
                  publishedAt={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
      {/* <div className='container d-flex justify-content-between'>
      <button type="button" className="btn btn-dark" disabled={page<=1} onClick={handlePrevClick}>&larr; Previous</button>
      <button type="button" className="btn btn-dark" disabled = {page+1 > Math.ceil(articles.totalResults/pageSize)} onClick={handleNextClick}>Next &rarr; </button>
      </div> */}
    </div>
  )
}

News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
