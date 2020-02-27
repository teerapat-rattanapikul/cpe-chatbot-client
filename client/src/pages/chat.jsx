import React from "react";

import Navbar from "../components/Navbar";
import Chatbox from "../components/Chatbox";
import Chatbox_extend from "../components/Chatbox_extend"

export default class Chat extends React.Component {
  render() {
    return (
      <React-DocumentFragment>
        <div className="">
            <Navbar />
            <div className="d-flex justify-content-center mr-auto">
                {/* <Chatbox /> */}
                <Chatbox_extend />
            </div>
        </div>
      </React-DocumentFragment>
    );
  }
}
