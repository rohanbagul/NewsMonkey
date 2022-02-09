import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, author, date, imageUrl, newsUrl,source } = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
        <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1'}}>
                {source}
              </span>
          <img
            src={
              !imageUrl
                ? "https://imageio.forbes.com/specials-images/imageserve/61f6aabe8549f926fe8b8f44/0x0.jpg?format=jpg&width=1200&fit=bounds"
                : imageUrl
            }
            className="card-img-top"
            alt="..."/>
          <div className="card-body">
            <h5 className="card-title">
              {title}
            
            </h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>

            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
