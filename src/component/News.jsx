import React, { useState, useContext, useEffect } from 'react';
import './News.css';
import './Modal.css';
import FallbackImage from '../img/fallbackImage.png';
import { Category, Country } from './Filter';
import { BbcChecked } from './Navbar';
import Loader from './Loader';
import BrandLogo from '../img/brandLogo.svg';

import Modal from 'react-bootstrap/Modal';
import TablePagination from '@material-ui/core/TablePagination';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';

const News = () => {
    // Loading Confimation
    const [loadConfirmation, setLoadConfirmation] = useState(false);

    // Imported Information
    const bbcNews = useContext(BbcChecked);
    const [category, country] = [useContext(Category).toLowerCase(), useContext(Country)];

    // Modal Content
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({});

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
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    // Handle PageSize in Pagination
    const handlePageSize = (event) => {
        setPageSize(parseInt(event.target.value, 10));
        setCurrentPage(0);
    }

    // Open News Modal
    const openNewsModal = (event) => {
        const news_id = event.target.id.substring(5);
        setModalContent(newsData[news_id]);
        setShowModal(true);
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

    // NEWS API Call for Top Headline from All Sources
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
                                        {/* <a href={news_info.url} rel="noreferrer" target="_blank" className="btn btn-secondary news_read_more">READ MORE</a> */}
                                        <button type="button" id={`news_${newsKey}`} onClick={openNewsModal} className="btn btn-secondary news_read_more">READ MORE</button>
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

            {/* NewsModal for Particular NewsCard */}
            <Modal
                size="xl"
                show={showModal}
                onHide={() => setShowModal(false)}
                dialogClassName="modal-100w"
                id="newsCardModal"
                aria-labelledby="newsModal"
            >
                <Modal.Header className="pb-0 modal_header_box" closeButton>
                    <Modal.Title id="newsModal" className="ps-3">
                        <p className="modal_heading">
                            <img src={BrandLogo} alt="World Today" />
                            <span>World Today</span>
                        </p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-6 news_img_col">
                                <img src={modalContent.urlToImage} alt={modalContent.title} />
                            </div>
                            <div className="col-xl-6 news_content_col">
                                {/* News Title */}
                                <h4 className="news_title">{modalContent.title}</h4>

                                {/* News Author & Date Published */}
                                <div className="news_details">
                                    <p><span>Source-</span> {(modalContent.source.name) === null ? 'Not Known' : modalContent.source.name}</p>
                                    <p><span>Author-</span> {(modalContent.author) === null ? 'Not Known' : modalContent.author}</p>
                                    <p><span>Published-</span> {timeConversion(`${modalContent.publishedAt}`)}</p>
                                </div>

                                {/* News Description */}
                                <p className="news_short"><span>Description-</span> {modalContent.description}</p>

                                {/* News Source Link */}
                                <a href={modalContent.url} className="source_link" target="_blank">Go To Source</a>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary px-5 close_btn" onClick={() => setShowModal(false)}>Close</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default News;