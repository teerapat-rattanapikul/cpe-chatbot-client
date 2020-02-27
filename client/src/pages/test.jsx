import React from "react"
import { ReactMic } from '@cleandersonlobo/react-mic'
import $ from 'jquery'
import "../css/record-button.css"
import Axios from "axios";
import api from '../api';
export default class test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            record: false
        };
        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
        this.recordToggle = this.recordToggle.bind(this);
    }
    
    startRecording() {
        this.setState({ record: true });
        console.log(this.state.record);

    }

    stopRecording() {
        this.setState({ record: false });
        console.log(this.state.record);
    }

    onData(recordedBlob) {
        console.log('chunk of real-time data is: ', recordedBlob);
    }

    onStop(recordedBlob) {
        console.log('recordedBlob is: ', recordedBlob);
        const url = 'http://localhost:5000/api/audio-message';
        const formData = new FormData();
        formData.append('audio', recordedBlob.blob);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        Axios.post(url, formData, config)
        
    }

     recordToggle() {
        $('#recButton').addClass("notRec");
        document.getElementById("recButton").addEventListener("click",()=>{
            if ($('#recButton').hasClass('notRec')) {
                console.log("rec");
                 this.setState({record:true});
                $('#recButton').removeClass("notRec");
                $('#recButton').addClass("Rec");
            }
            else {
                console.log("stop");
                 this.setState({ record: false });
                $('#recButton').removeClass("Rec");
                $('#recButton').addClass("notRec");
            }
        })
      
    }

     componentDidMount() {
         this.recordToggle();
    }
    render() {
        return (
            <React-DocumentFragment>
                <h1 className="display-4">Record test</h1>
                <div className="">
                    <ReactMic
                        record={this.state.record}
                        className="sound-wave collapse"
                        onStop={this.onStop}
                        onData={this.onData}
                        strokeColor="#ebf0f5"
                        backgroundColor="#34312e" />
                </div>
               <img src="https://lh3.googleusercontent.com/proxy/xGHJHnSEtV21PoDFyWPf1J7-TyGv0uzfeLpSAWAsLfZbNdHUEEREB-gJsj64r_76nGawc46R9y3EAxKahIcCMFxi1nA8trwrAXCHQMmhVBpqeue1MWVxp1w54c-cOy7YrnyJ9zBqNmAKoTo15A" id="recButton" className="rec-button" />
            </React-DocumentFragment>
        )
    }
}