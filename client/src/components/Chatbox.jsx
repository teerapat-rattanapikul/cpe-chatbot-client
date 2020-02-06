import React from "react";
import api from "../api";

import "../css/chat.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
import $ from "jquery";

export default class Chatbox extends React.Component {
  constructor(props) {
    super();
    this.state = {
      msg: "",
      responseMsg: "",
      dateNow: "",
      user_img: "https://praew.com/app/uploads/2019/04/68508.jpg",
      user_name: "",
      bot_img:
        "https://hilight.kapook.com/img_cms2/user/juthamat/jutha03/3_28.jpg",
      bot_name: "O"
    };

    this.sendMsg = this.sendMsg.bind(this);
    this.setNickname = this.setNickname.bind(this);
  }
  componentWillMount() {
    this.setState({ dateNow: this.formatDate(new Date()) });
  }

  async componentDidMount() {
    await this.setNickname();
  }
  async setNickname() {
    const { value: name } = await Swal.fire({
      input: "text",
      inputPlaceholder: "Enter your name ?",
      allowOutsideClick: false,
      inputValidator: value => {
        return new Promise(resolve => {
          if (value !== "") {
            resolve();
          } else {
            resolve("Please input your name!");
          }
        });
      }
    });
    this.setState({ user_name: name });
    await $(".display-name").show("fast");
    await $(".m-box").show("fade");
    
  }

  appendMessage(name, img, side, text) {
    const msgerChat = document.querySelector(".msger-chat");
    const msgHTML = `
          <div class="msg ${side}-msg">
            <div class="msg-img" style="background-image: url(${img})"></div>
            <div class="msg-bubble">
              <div class="msg-info">
                <div class="msg-info-name">${name}</div>
                <div class="msg-info-time">${this.formatDate(new Date())}</div>
              </div>
      
              <div class="msg-text">${text}</div>
            </div>
          </div>
        `;

    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 500;
  }

  formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();
    return `${h.slice(-2)}:${m.slice(-2)}`;
  }

  async sendMsg(msg) {
    // const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
    if (this.state.msg !== "") {
      this.appendMessage(
        this.state.user_name,
        this.state.user_img,
        "right",
        msg
      );
      document.querySelector(".msger-input").value = "";
      this.setState({ msg: "" });

      //send msg to bot
      const body = JSON.stringify({
        message: msg,
        sessionId: "User1"
      });
      const callback = await api.post("api/dialogflowGateway", body);
      await this.setState({ responseMsg: callback.data.fulfillmentText });

      await this.botResponse();
    }
  }

  async botResponse() {
    // const BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
    if (this.state.responseMsg === "")
      await this.setState({ responseMsg: "What ?" });
    await this.appendMessage(
      this.state.bot_name,
      this.state.bot_img,
      "left",
      this.state.responseMsg
    );
    await this.setState({ responseMsg: "" });
  }

  render() {
    return (
      <React-DocumentFragment>
        <hr />
        <div className="display-name collapse">
          <h4 className="btn btn-dark" >
            Your name : {this.state.user_name}
          </h4>
        </div>
        <div className="m-box collapse">
          <section className="msger">
            <header className="msger-header">
              <div className="msger-header-title">
                <i className="fas fa-comment-alt"></i> CPE-Chatbot
              </div>
              <div className="msger-header-options">
                <span>
                  <i className="fas fa-cog"></i>
                </span>
              </div>
            </header>

            <div className="msger-chat">
              <div className="msg left-msg">
                <div
                  className="msg-img"
                  style={{
                    backgroundImage:
                      "url(https://hilight.kapook.com/img_cms2/user/juthamat/jutha03/3_28.jpg)"
                  }}
                ></div>

                <div className="msg-bubble">
                  <div className="msg-info">
                    <div className="msg-info-name">{this.state.bot_name}</div>
                    <div className="msg-info-time">{this.state.dateNow}</div>
                  </div>
                  <div className="msg-text">
                    สวัสดี {this.state.user_name} ฉันคือ Bot ของ CPE-Chatbot
                    มีอะไรให้รื้อ เอ้ย ให้ช่วย😄
                  </div>
                </div>
              </div>

              <div className="msg right-msg"></div>
            </div>

            <form
              className="msger-inputarea"
              onSubmit={async e => {
                e.preventDefault();
                await this.sendMsg(this.state.msg);
              }}
            >
              <input
                type="text"
                className="msger-input"
                placeholder="Enter your message..."
                value={this.state.msg}
                onChange={e => this.setState({ msg: e.target.value })}
              />
              <button type="submit" className="msger-send-btn">
                Send
              </button>
            </form>
          </section>
        </div>
      </React-DocumentFragment>
    );
  }
}
