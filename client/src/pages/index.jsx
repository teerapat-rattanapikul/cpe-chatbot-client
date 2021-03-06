import React from "react";
import "../css/home.css";


export default class App extends React.Component {
  render() {
    return (
      <React-fragment>
        <div className="index">
          <img src="/img/index.jpg" alt="Safty First" className="img-index" />
          <div className="center">
            <a href="/app">
              <button className="btn btn-dark button-index">        
                Enter chat
              </button>
            </a>
          </div>
          <div className="center ">
            <img className="logo mr-3 ml-3" src="/img/Gear.png" alt="" />
            &nbsp;&nbsp;&nbsp;
            <img className="logo mr-3 ml-3" src="/img/cpe.png" alt="" />
          </div>
          <p className="center index-text">
            - Department of Computer Engineering, Chiang Mai University -
          </p>

        </div>
      </React-fragment>
    );
  }
}
