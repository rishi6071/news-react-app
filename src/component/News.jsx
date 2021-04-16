import React, { useState, useContext, useEffect } from 'react';
import './News.css';
import FallbackImage from '../img/fallbackImage.png';
import { Category, Country } from './Filter';
import { BbcChecked } from './Navbar';
import Loader from './Loader';

import TablePagination from '@material-ui/core/TablePagination';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';

const News = () => {
    const [loadConfirmation, setLoadConfirmation] = useState(false);
    const bbcNews = useContext(BbcChecked);
    const [category, country] = [useContext(Category).toLowerCase(), useContext(Country)];

    // useStates for Pagination [pageSize, currentPage]
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalResults, setTotalResults] = useState(0);

    // useState for News Data
    const [newsData, setNewsData] = useState([]);

    // For Time Conversion
    const timeConversion = (date) => {
        const publishedAt = new Date(date);
        return `${publishedAt.toDateString()} ${publishedAt.toLocaleTimeString()}`;
    }

    // Handle CurrentPage in Pagination
    const handleCurrentPage = (event, newPage) => {
        setCurrentPage(newPage);
    }

    // Handle PageSize in Pagination
    const handlePageSize = (event) => {
        setPageSize(parseInt(event.target.value, 10));
        setCurrentPage(0);
    }

    // NEWS API Call For BBC News
    useEffect(() => {
        var urlBbc = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=198fd94ef88b42bda6a5dac53eab1b27`;
        var reqBbc = new Request(urlBbc);

        async function getBbcData() {
            if (bbcNews) {
                fetch(reqBbc).then(function (response) {
                    return response.json();
                }).then((res) => {
                    console.log(res);
                    setNewsData(res.articles);
                    if (res.articles.length === 0 || res.articles === null || res.articles === undefined)
                        setLoadConfirmation(false);
                    else
                        setLoadConfirmation(true);
                }).catch((error) => {
                    setLoadConfirmation(false);
                });
            }

            // Set Pagination Conditions to DEFAULT
            setCurrentPage(0);
            setPageSize(10);
        }
        getBbcData();
    }, [bbcNews]);

    // NEWS API Call
    useEffect(() => {
        var url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${currentPage + 1}&pageSize=${pageSize}&apiKey=198fd94ef88b42bda6a5dac53eab1b27`;
        var req = new Request(url);

        async function getData() {
            if (!bbcNews) {
                fetch(req).then(function (response) {
                    return response.json();
                }).then((res) => {
                    setTotalResults(res.totalResults);
                    setNewsData(res.articles);
                    if (res.articles.length === 0 || res.articles === null || res.articles === undefined)
                        setLoadConfirmation(false);
                    else
                        setLoadConfirmation(true);
                }).catch((error) => {
                    setLoadConfirmation(false);
                });
            }
        }
        getData();
    }, [category, country, bbcNews, currentPage, pageSize]);

    // Load Confirmation Loader
    if (!loadConfirmation) {
        return <Loader />
    }

    return (
        <>
            <div className="container my-5" id="news_box">
                {
                    newsData.map((news_info, newsKey) => {
                        return (
                            <>
                                <div className="row news_card" key={`news-${newsKey}`}>
                                    <div className="col-lg-4 col-md-5 news_img_col">
                                        {/* News Image */}
                                        <img src={(news_info.urlToImage === null) ? FallbackImage : news_info.urlToImage} alt={news_info.title} />
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
                                        <a href={news_info.url} rel="noreferrer" target="_blank" class="btn btn-secondary news_read_more">READ MORE</a>
                                    </div>
                                </div>
                            </>
                        );
                    })
                }
            </div>

            {/* Pagination */}
            <div className="container mb-5" style={{ display: (!bbcNews) ? 'block' : 'none' }}>
                <div className="d-flex justify-content-center">
                    <TablePagination
                        component="div"
                        count={totalResults}
                        page={currentPage}
                        onChangePage={handleCurrentPage}
                        rowsPerPage={pageSize}
                        onChangeRowsPerPage={handlePageSize}
                    />
                </div>
            </div>
        </>
    );
}

export default News;