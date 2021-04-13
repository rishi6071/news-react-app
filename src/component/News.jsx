import React from 'react';
import './News.css';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';

const News = () => {
    const timeConversion = (date) => {
        return new Date(date).toLocaleString();
    }

    return (
        <>
            <div className="container my-5" id="news_box">
                <div className="row news_card">
                    <div className="col-md-4 news_img_col">
                        {/* News Image */}
                        <img src="https://mondrian.mashable.com/2021%252F03%252F24%252F4c%252F5e557a4d5d144e0898e8f087466d455a.46b57.jpg%252F1200x630.jpg?signature=O7ZjxA7YXNEMQMd0_p1tOsVA6iY=" alt="News" />
                    </div>
                    <div className="col-md-8 news_content_col">
                        {/* News Title */}
                        <h4 className="news_title">Tesla now accepts Bitcoin in the US Tesla now accepts Bitcoin in the US</h4>

                        {/* News Author & Date Published */}
                        <div className="row news_author_published">
                            <div className="col-lg-6 col-md-5">
                                <p>Author- David Murphy</p>
                            </div>
                            <div className="col-lg-6 col-md-7">
                                <p>Published- {timeConversion('2021-03-31T14:00:00Z')}</p>
                            </div>
                        </div>

                        {/* News Description */}
                        <p className="news_description">
                            As it promised earlier this year, Tesla now accepts payment in Bitcoin,
                            according to Tesla's website and a tweet from CEO Elon Musk.
                        </p>

                        {/* News READ MORE */}
                        <a href="#" target="_blank" class="btn btn-secondary news_read_more">READ MORE</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default News;