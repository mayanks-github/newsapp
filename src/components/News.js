import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props)=>{
  const [articles, setArticle] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitaliseFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const updateNews = async ()=>{
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    props.setProgress(30)
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json()
    props.setProgress(70)
    setArticle(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitaliseFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
  }, [])

  const handleNextClick = async ()=> {
    setPage(page + 1)
    updateNews()
  }

  const handlePrevClick = async ()=> {
    setPage(page -  1)
    updateNews()
  }

  const fetchMoreData = async () => {
    setPage(page + 1)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticle(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };

  return (
    <div className='container my-3'>
      <h1 className='text-center' style={{margin: "90px 0px 34px"}}>NewsMonkey - Top {capitaliseFirstLetter(props.category)} Headlines</h1>
      <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={articles.length !== totalResults} loader={<Spinner/>}>
        <div className="container">
          <div className='row'>
            {articles.map((element)=>{
              return<div className='col-md-3' key={element.url}>
                <NewsItem title={element.title.slice(0,60)} desctiption={element.desctiption} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                <br/>
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News