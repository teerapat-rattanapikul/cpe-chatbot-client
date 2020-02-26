import React from "react";

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="/app#">
          <img
            className="d-inline-block align-top m-1"
            src="https://image.flaticon.com/icons/svg/2040/2040946.svg"
            alt="Bot icons | Noun Project"
            id="cpimg"
            width="85"
            height="80"
          />
          <span className="display-4"> | CPE ChatBot</span>
        </a>
        <a href="https://cpe.eng.cmu.ac.th/2013/" className="navbar-brand">
          <img
            className="d-inline-block align-top m-1"
            src="/img/Gear.png"
            alt="Bot icons | Noun Project"
            id="cpimg"
            width="83"
            height="80"
          />
          <img
            className="d-inline-block align-top m-1"
            src="/img/cpecmu-logo.png"
            alt="Bot icons | Noun Project"
            id="cpimg"
            width="65"
            height="80"
          />
        </a>
      </nav>
    );
  }
}
