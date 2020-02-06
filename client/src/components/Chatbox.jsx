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
    await this.selectAvatar();
    await this.setNickname();
  }

  async selectAvatar() {
    const lift =
        "https://scontent.fbkk5-4.fna.fbcdn.net/v/t1.15752-9/83353732_788043008364391_5150885528551292928_n.jpg?_nc_cat=110&_nc_ohc=wyve7bTZeYMAX97rKlH&_nc_ht=scontent.fbkk5-4.fna&oh=6659536bda0c371bb7dd6e31779ecf13&oe=5EC17084",
      aof =
        "https://scontent.fbkk5-8.fna.fbcdn.net/v/t1.15752-9/81885546_607962379775003_6678906803658424320_n.jpg?_nc_cat=106&_nc_ohc=TWH7rA94b0IAX8Fzw7q&_nc_ht=scontent.fbkk5-8.fna&oh=722f3944718a4338e4c076f92cfb5662&oe=5EDB42CA",
      ice =
        "https://scontent.fbkk5-7.fna.fbcdn.net/v/t1.15752-9/70633252_499858997505310_2551079087695200256_n.jpg?_nc_cat=108&_nc_ohc=YQqykneXRsQAX_9yyKm&_nc_ht=scontent.fbkk5-7.fna&oh=29b7b7d27e960fa696c356a6ea133f52&oe=5ED186EC",
      pleum =
        "https://scontent.fbkk5-4.fna.fbcdn.net/v/t1.15752-9/82376166_522843711922248_6490645764165861376_n.jpg?_nc_cat=110&_nc_ohc=1-EQIXADfAYAX-z-_bd&_nc_ht=scontent.fbkk5-4.fna&oh=38e7b594ece32e4b33f29bf653fa15df&oe=5EBEE842",
      boss =
        "https://scontent.fbkk5-4.fna.fbcdn.net/v/t1.15752-9/72339907_967070410302168_7327105479878901760_n.jpg?_nc_cat=103&_nc_ohc=xcdRQ8SVS0kAX9m8bD-&_nc_ht=scontent.fbkk5-4.fna&oh=da9cc4c1ee9f0f771cc8053d14cab1d6&oe=5ED5F108";

    const inputOptions = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          lift: `<img class="avatar-select" src="${lift}" width="150px"/><p>Salim</p>`,
          aof: `<img class="avatar-select" src="${aof}" width="150px"/><p>Winter man</p>`,
          ice: `<img class="avatar-select" src="${ice}" width="150px"/><p>impossibeman</p>`,
          pleum: `<img class="avatar-select" src="${pleum}" width="150px"/><p>talesrunner-man</p>`,
          boss: `<img class="avatar-select" src="${boss}" width="150px" /><p>indy girl</p>`
        });
      }, 1000);
    });

    const { value: img } = await Swal.fire({
      title: "Select Avatar",
      input: "radio",
      inputOptions: inputOptions,
      allowOutsideClick: false,
      customClass: "swal-wide",
      // imageUrl: 'https://scontent.fbkk5-3.fna.fbcdn.net/v/t1.0-9/p720x720/82467478_2644844852266031_3464638637512065024_o.jpg?_nc_cat=111&_nc_ohc=NAJXtPJmhOwAX-X4HaD&_nc_ht=scontent.fbkk5-3.fna&_nc_tp=6&oh=8b8422fba24abe83a2665c61216a2adc&oe=5ECD87A7',
      inputValidator: value => {
        if (!value) {
          return "You need to choose something!";
        }
      }
    });
    var imgPath = "";
    if (img === "lift") imgPath = lift;
    else if (img === "aof") imgPath = aof;
    else if (img === "ice") imgPath = ice;
    else if (img === "pleum") imgPath = pleum;
    else if (img === "boss") imgPath = boss;
    await this.setState({ user_img: imgPath });
    $(".img-sec").html(`<img src="${imgPath}" class="msg-img" />`)
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
          <span className="img-sec"></span>
          <h4 className="btn btn-dark">Name : {this.state.user_name}</h4>
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
