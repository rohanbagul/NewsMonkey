import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from 'react-top-loading-bar'




export class News extends Component {
  static defaultPrpos = {
    country: 'in',
    pageSize:8,
    category: 'general'
  }
   static propTypes = {
    country: PropTypes.string,
    pageSize:PropTypes.number,
    category: PropTypes.string,
   }
    constructor(){
        super();
        console.log("NewsMonkey")
        this.state ={
            articles: [],
            loading: false,
            page:1,
            totalResults:0
        }
    }
    async componentDidMount(){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a429a954a4984f94a7416ebc1afe2ed8&page=1&pageSize=${this.props.pageSize}`
      this.setState({loading:true})
      let data = await fetch(url);
      let parsedData = await data.json()
      this.setState({articles: parsedData.articles,totalResults: parsedData.totalResults, loading:false })

    }
    handleprevClick = async () =>{
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a429a954a4984f94a7416ebc1afe2ed8&page=${this.state.page - 1}&pageSize = ${this.props.pageSize}`;
      this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json()
      this.setState(
      {
        page: this.state.page - 1,
        articles: parsedData.articles,
        loading: false

      })

    }

   handlenextClick = async () =>{
     if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

     }
     else{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a429a954a4984f94a7416ebc1afe2ed8&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json()
    
      this.setState(
      {
        page: this.state.page +1,
        articles: parsedData.articles,
        loading:false

      }

      )
    }
  }
    fetchMoreData = async () => {
     
      this.setState({page:this.state.page+1})
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a429a954a4984f94a7416ebc1afe2ed8&page=${this.state.page}&pageSize = ${this.props.pageSize}`;
      this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json()
      this.setState(
      {
        articles: this.state.articles.concat(parsedData.articles),
        totalResults:parsedData.totalResults,
        loading: false
      })
      
    };
    
    render() {
        return (
            <div className="container my-3">
            <h1 className="text-center" style={{margin: '35px 0px', marginTop:'90px'}}>NewsMonkey - Top Headlines</h1>
          {/* {this.state.loading && <Spinner/>} */}
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !==this.state.totalResults}
          loader={<Spinner/>}>
          <div className="contaniner">

          </div>


                <div className="row">
                {this.state.articles.map((element)=>{
                    return <div className="col md-3"key={element.url} >
                    <NewsItem title = {element.title?element.title:""} description ={element.description?element.description:""} imageUrl ={element.urlToImage}
                      newsUrl={element.url} author={element.author} date ={element.publishedAt} source={element.source.name}/>
                </div>
                })}
                </div>
                </InfiniteScroll>
            </div>
        )
    }
}

export default News
