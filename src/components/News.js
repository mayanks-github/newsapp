import React, { Component } from 'react'
import NewsItem from './NewsItem'
import { Spinner } from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitaliseFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  constructor(props){
    super(props)
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    }
    document.title = `${this.capitaliseFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async pageUpdate() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ebc350a7a0c642039a6468fbb1f19402&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false
    })
  }

  async componentDidMount(){
    this.pageUpdate()
  }

  handleNextClick = async ()=> {
    this.setState({page: this.state.page + 1})
    this.pageUpdate()
  }

  handlePrevClick = async ()=> {
    this.setState({page: this.state.page - 1})
    this.pageUpdate()
  }

  render() {
    return (
      <div className='container my-3'>
        {this.state.loading && <Spinner />}
        <h1 className='text-center' style={{margin: "34px 0px"}}>NewsMonkey - Top {this.capitaliseFirstLetter(this.props.category)} Headlines</h1>
        <div className='row'>
          {!this.state.loading && this.state.articles.map((element)=>{
            return<div className='col-md-3' key={element.url}>
              <NewsItem title={element.title.slice(0,60)} desctiption={element.desctiption} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
              <br/>
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News