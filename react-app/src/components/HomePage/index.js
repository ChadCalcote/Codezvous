import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EventGallery from '../EventGallery'
import "./HomePage.css";

const HomePage = () => {

    return (
        <div className="home-page">
            <div className="home-page_header">
            </div>
            <EventGallery />
            <div className="home-page_sidebar">
            </div>
        </div>
    )
}

export default HomePage;
