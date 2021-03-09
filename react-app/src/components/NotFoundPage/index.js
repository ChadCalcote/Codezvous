import React from 'react';
import image from './404.png';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div id="error-page">
      <div id="error-page_img">
        <img src={image} alt="logo" />
      </div>
      <div id="error-page_message">
        <h1> Error </h1>
        <h1> Does Not Compute! </h1>
        <h2> Try clicking on the Home icon at the top to find a valid Codezvous</h2>
      </div>
    </div>
  )
}
export default NotFoundPage;