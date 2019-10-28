import React, { Component } from 'react';
import axios from "axios/index";

import Message from './message';


//import Speech from './Speech'; 
import InputBox from './inputBox';
import SpeechAPI from '../chatbot/speechAPi/speechAPI';



class Chatbot extends Component {

    constructor(props) {
        super(props);

         this.state = {
            messages: [],
            speechTxt: '',
        }
    }

    textQueryWrapper = async (text) => {
        let url = 'http://localhost:5000/api_dftext';
        let myConversation = {
            speaks: 'user',
            msg: {
                text: {
                    text: text
                }
            }
        };

        this.setState({ messages: [...this.state.messages, myConversation] });

        axios.post(url, { text }).then(response => {


            for (let msg of response.data.fulfillmentMessages) {
                let says = {
                    speaks: 'bot',
                    msg: msg
                }
                this.setState({ messages: [...this.state.messages, says] });
            }
            console.log(['*********CLIENT STRUCTURE**********\n'], response);
        }

        );

    }//end textQueryWrapper


    handleInputkey = (e) => {
        let a = e.target.value
        console.log(a);
        if (e.key === 'Enter') {

            this.textQueryWrapper(a);

        }
    }

    speechHandle = async () => {
        const a = new SpeechAPI();
         a.startSpeech();
    }


    renderMessages(returnedMessages) {
        if (returnedMessages) {
            return returnedMessages.map((message, i) => {
                return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />;
            })
        } else {
            return '[*NO MESSAGES*]';
        }
    }




    render() {
        return (
            <div style={styles.cbcontainer}>
                <div id="chatbot" style={{ height: '100%', width: '100%', overflow: 'auto' }}>
                    {this.renderMessages(this.state.messages)}

                    <InputBox
                        click={this.speechHandle}
                        paramsAtranscript={this.state.speechTxt}

                    />

                </div>
            </div>
        )
    }
}//end chatbot



const styles = {
    cbcontainer: {
        backgroundColor: '#1a237e',
        height: '60%',
        width: '70%',
        marginLeft: '30%',
        borderColor: 'black',
        border: 'solid 5px #97ca3d',
        padding: '2%',
        paddingLeft: '3%',
        marginLeft: '15%',
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px'

    }


}

export default Chatbot; 
