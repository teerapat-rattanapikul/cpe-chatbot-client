import React from 'react';
import '../css/App.css';

export default class App extends React.Component {
  render(){
    return (
      <div className="container">
          <h1 class="display-4">CPE-Chatbot</h1>
          <hr/>
          <input class="form-control" type="text" name="" id="" placeholder="text message"/> 
          <br/>
          <button class="btn btn-success">Send -></button>  
      </div>
         
    );
  }
}



