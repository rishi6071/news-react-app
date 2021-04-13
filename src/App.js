import React from 'react';
import './App.css';
import Navbar from './component/Navbar';
import Filter from './component/Filter';
import News from './component/News';

const App = () => {
    return (
        <>
            <Navbar />
            <Filter />
            <News />
        </>
    );
}

export default App;