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
      user_img: "https://image.flaticon.com/icons/svg/145/145867.svg",
      user_name: "Guest",
      bot_img:
        "https://image.flaticon.com/icons/svg/327/327779.svg",
      bot_name: "CPE-bot"
    };

    this.sendMsg = this.sendMsg.bind(this);
    this.setNickname = this.setNickname.bind(this);
  }

  componentWillMount() {
    this.setState({ dateNow: this.formatDate(new Date()) });
  }

  async componentDidMount() {
    // await this.selectAvatar();
    // await this.setNickname();
  }

  async selectAvatar() {
    const lift =
        "https://scontent.fbkk5-4.fna.fbcdn.net/v/t1.15752-9/83353732_788043008364391_5150885528551292928_n.jpg?_nc_cat=110&_nc_ohc=wyve7bTZeYMAX97rKlH&_nc_ht=scontent.fbkk5-4.fna&oh=6659536bda0c371bb7dd6e31779ecf13&oe=5EC17084",
      aof =
        "https://scontent.fbkk5-8.fna.fbcdn.net/v/t1.15752-9/81885546_607962379775003_6678906803658424320_n.jpg?_nc_cat=106&_nc_ohc=TWH7rA94b0IAX8Fzw7q&_nc_ht=scontent.fbkk5-8.fna&oh=722f3944718a4338e4c076f92cfb5662&oe=5EDB42CA",
      ice =
        "https://scontent.fbkk5-7.fna.fbcdn.net/v/t1.15752-9/70633252_499858997505310_2551079087695200256_n.jpg?_nc_cat=108&_nc_ohc=YQqykneXRsQAX_9yyKm&_nc_ht=scontent.fbkk5-7.fna&oh=29b7b7d27e960fa696c356a6ea133f52&oe=5ED186EC",
      pleum =
        "https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.15752-9/84768336_188620725828585_105432702563385344_n.jpg?_nc_cat=107&_nc_ohc=QjVUqVjCONsAX-NaJBH&_nc_ht=scontent.fbkk10-1.fna&oh=6041d57eefe1a45d7b73e454e64b9f3e&oe=5EC8ADBF",
      boss =
        "https://scontent.fbkk5-4.fna.fbcdn.net/v/t1.15752-9/72339907_967070410302168_7327105479878901760_n.jpg?_nc_cat=103&_nc_ohc=xcdRQ8SVS0kAX9m8bD-&_nc_ht=scontent.fbkk5-4.fna&oh=da9cc4c1ee9f0f771cc8053d14cab1d6&oe=5ED5F108",
      por = "https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.15752-9/84991232_617615495670365_6489035598106460160_n.jpg?_nc_cat=110&_nc_ohc=CtW3UYnft6gAX-F5oAi&_nc_ht=scontent.fbkk10-1.fna&oh=1cf258f6e9c8c1ca06dd8eab5fd5375a&oe=5ECD58C4"

    const inputOptions = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          lift: `<img class="avatar-select" src="${lift}" width="150px"/><p>Salim</p>`,
          aof: `<img class="avatar-select" src="${aof}" width="150px"/><p>Winter man</p>`,
          ice: `<img class="avatar-select" src="${ice}" width="150px"/><p>impossibeman</p>`,
          pleum: `<img class="avatar-select" src="${pleum}" width="150px"/><p>talesrunner-man</p>`,
          boss: `<img class="avatar-select" src="${boss}" width="150px" /><p>indy girl</p>`,
          por: `<img class="avatar-select" src="${por}" width="150px" /><p>boxing man</p>`
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
    else if (img === "por") imgPath = por;
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
    if (this.state.responseMsg === "whoami")
      await this.setState({ responseMsg: `คุณชื่อ ${this.state.user_name}` });
    if(this.state.responseMsg === "")
      await this.setState({responseMsg : "อะไร ?"});
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
        <div className="display-name">
          <span className="img-sec"></span>
          <h4 className="btn btn-outline-dark">Name : {this.state.user_name}</h4>
        </div>
        <div className="m-box">
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
                      `url(${this.state.bot_img})`
                  }}
                ></div>

                <div className="msg-bubble">
                  <div className="msg-info">
                    <div className="msg-info-name">{this.state.bot_name}</div>
                    <div className="msg-info-time">{this.state.dateNow}</div>
                  </div>
                  <div className="msg-text">
                    สวัสดี {this.state.user_name} ฉันคือ Bot ของ CPE-Chatbot
                    มีอะไรให้ช่วย😄
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
