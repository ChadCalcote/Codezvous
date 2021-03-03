import React from "react";
import { SocialIcon } from "react-social-icons";
import './Footer.css';

const Footer = () => {

    return (
      <div className="footer-container">
        <div className="footer-container_title">
          Codezvous :
          <br />
          a <a href="http://meetup.com">Meetup</a> clone project
        </div>
          <div className="footer-container_jimmy">
            <div className="name">Demeatrice James <br /> Sherrod</div>
            <div className="icon-container">
              <SocialIcon className="icon" url="https://github.com/Dem-Eat-Rice" />
              <SocialIcon className="icon" url="https://www.linkedin.com/in/demeatrice-james-sherrod-2650091a4" />
              <SocialIcon className="icon" url="mailto:demeatricej.sherrod@gmail.com" />
            </div>
          </div>
          <div className="footer-container_dan">
            <div className="name">Dan Chin</div>
            <div className="icon-container">
              <SocialIcon className="icon" url="https://github.com/bongochin" />
              <SocialIcon className="icon" url="https://www.linkedin.com/in/danielmchin/" />
              <SocialIcon className="icon" url="mailto:danielmchin@outlook.com" />
            </div>
          </div>
          <div className="footer-container_chris">
            <div className="name">Chris Clark</div>
            <div className="icon-container">
              <SocialIcon className="icon" url="https://github.com/percist" />
              <SocialIcon className="icon" url="https://www.linkedin.com/in/crclark101010/" />
              <SocialIcon className="icon" url="mailto:percist@gmail.com" />
            </div>
          </div>
          <div className="footer-container_chad">
            <div className="name">Chad Calcote</div>
            <div className="icon-container">
              <SocialIcon className="icon" url="https://github.com/ChadCalcote" />
              <SocialIcon className="icon" url="https://www.linkedin.com/in/chadcalcote/" />
              <SocialIcon className="icon" url="mailto:calcote@att.net" />
            </div>
          </div>
        </div>
    );
}

export default Footer;
