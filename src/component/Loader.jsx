import React from 'react';
import './Loader.css';
import LoaderGIF from '../img/loader.gif';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';

const Loader = () => {
    return (
        <>
            <div className="container my-5" id="loader_box">
                <h3 className="loader_text">Loading...</h3>
                <img src={LoaderGIF} alt="Loader" />
            </div>
        </>
    );
}

export default Loader;