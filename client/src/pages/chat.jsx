import React from "react";

import Navbar from "../components/Navbar";
import Chatbox from "../components/Chatbox";


export default class Chat extends React.Component {
  render() {
    return (
      <React-DocumentFragment>
        <div className="container">
            <Navbar />
            <div className="d-flex justify-content-center mr-auto">
                <Chatbox />
            </div>
        </div>
      </React-DocumentFragment>
    );
  }
}
