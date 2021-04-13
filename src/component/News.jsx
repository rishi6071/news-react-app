import React, { useState, useContext, useEffect } from 'react';
import './News.css';
import FallbackImage from '../img/fallbackImage.png';
import { Category, Country } from './Filter';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';

const News = () => {
    const [category, country] = [useContext(Category), useContext(Country)];

    // useState for News Data
    const [newsData, setNewsData] = useState([]);

    const timeConversion = (date) => {
        const publishedAt = new Date(date);
        return `${publishedAt.toDateString()} ${publishedAt.toLocaleTimeString()}`;
    }

    // NEWS API Call
    useEffect(() => {
        var url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category.toLowerCase()}&apiKey=198fd94ef88b42bda6a5dac53eab1b27`;

        var req = new Request(url);
        fetch(req).then(function (response) {
            return response.json();
        }).then((res) => {
            // console.log(res);
            setNewsData(res.articles);
        });
    }, [category, country]);

    return (
        <>
            <div className="container my-5" id="news_box">
                {
                    newsData.map((news_info) => {
                        return (
                            <>
                                <div className="row news_card">
                                    <div className="col-lg-4 col-md-5 news_img_col">
                                        {/* News Image */}
                                        <img src={(news_info.urlToImage === null)? FallbackImage : news_info.urlToImage} alt={news_info.title} />
                                    </div>
                                    <div className="col-lg-8 col-md-7 news_content_col">
                                        {/* News Title */}
                                        <h4 className="news_title">{news_info.title}</h4>

                                        {/* News Author & Date Published */}
                                        <div className="row news_author_published">
                                            <div className="col-lg-6 col-md-5">
                                                <p>Author- {(news_info.author) === null ? 'Not Known' : news_info.author}</p>
                                            </div>
                                            <div className="col-lg-6 col-md-7">
                                                <p>Published- {timeConversion(`${news_info.publishedAt}`)}</p>
                                            </div>
                                        </div>

                                        {/* News Description */}
                                        <p className="news_description">{news_info.description}</p>

                                        {/* News READ MORE */}
                                        <a href={news_info.url} target="_blank" class="btn btn-secondary news_read_more">READ MORE</a>
                                    </div>
                                </div>
                            </>
                        );
                    })
                }
            </div>
        </>
    );
}

export default News;