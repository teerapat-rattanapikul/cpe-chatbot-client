import React from "react";

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="/app#">
          <img
            className="d-inline-block align-top"
            src="https://image.flaticon.com/icons/svg/2040/2040946.svg"
            alt="Bot icons | Noun Project"
            id="cpimg"
            width="85"
            height="80"
          />
          <span className="display-4"> | CPE ChatBot</span>
        </a>
      </nav>
    );
  }
}
