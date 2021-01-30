import React from "react";
import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import './Footer.css';

const Footer = () => {

    return (
      <div className="footer-container">
        <div className="footer-container_title">Codezvous</div>
        <div className="footer-container_connect">Stay Connected</div>
        <div className="footer-container_jimmy">
          <div className="name">Demeatrice James Sherrod</div>
          <a className="email" href="mailto:demeatricej.sherrod@gmail.com">demeatricej.sherrod@gmail.com</a>
          <SocialIcon url="https://www.linkedin.com/in/demeatrice-james-sherrod-2650091a4" />
        </div>
        <div className="footer-container_dan">
          <div className="name">Dan Chin</div>
          <a className="email" href="mailto:danielmchin@outlook.com">danielmchin@outlook.com</a>
          <SocialIcon url="https://www.linkedin.com/in/danielmchin/" />
        </div>
        <div className="footer-container_chris">
          <div className="name">Chris Clark</div>
          <a className="email" href="mailto:percist@gmail.com">percist@gmail.com</a>
          <SocialIcon url="https://www.linkedin.com/in/crclark101010/" />
        </div>
        <div className="footer-container_chad">
          <div className="name">Chad Calcote</div>
          <a className="email" href="mailto:calcote@att.net">calcote@att.net</a>
          <SocialIcon url="https://www.linkedin.com/in/chadcalcote/" />
        </div>
      </div>
    );
}

export default Footer;
