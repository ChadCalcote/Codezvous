import './index.css'
import React from "react";
import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";

const Footer = () => {

    return (
      <div className="footer-container">
        <div className="footer-container_title">Codezvous</div>
        <div className="footer-container_connect">Stay Connected</div>
        <div className="footer-container_jimmy">
          <div className="name">Demeatrice James Sherrod</div>
          <div className="email">demeatricej.sherrod@gmail.com</div>
          <SocialIcon url="https://www.linkedin.com/in/demeatrice-james-sherrod-2650091a4" />
        </div>
        <div className="footer-container_dan">
          <div className="name">Dan Chin</div>
          <div className="email">chin.soonmin@gmail.com</div>
          <SocialIcon url="https://www.linkedin.com/in/danielmchin/" />
        </div>
        <div className="footer-container_chris">
          <div className="name">Chris Clark</div>
          <div className="email">percist@gmail.com</div>
          <SocialIcon url="https://www.linkedin.com/in/crclark101010/" />
        </div>
        <div className="footer-container_chad">
          <div className="name">Chad Calcote</div>
          <div className="email">calcote@att.net</div>
          <SocialIcon url="https://www.linkedin.com/in/chadcalcote/" />
        </div>
      </div>
    );
}

export default Footer;