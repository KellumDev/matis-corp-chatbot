import React, { Component } from 'react';
import axios from "axios/index";

import Message from './message';
import InputBar from './inputBox'; 
class Chatbot extends Component {

    constructor(props) {
        super(props);

        this.handleInputkey = this.handleInputkey.bind(this);

        this.state = {
            messages: []
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

    inithandleAlert = () => {
        console.log('clicked'); 
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

    handleInputkey(e) {
        let a = e.target.value
        console.log(a);
        if (e.key === 'Enter') {
        
            this.textQueryWrapper(a);

        }
    }

 
    render() {
        return (
            <div style={styles.cbcontainer}>
                <div id="chatbot" style={{ height: '100%', width: '100%', overflow: 'auto' }}>
                    {this.renderMessages(this.state.messages)}
                    <InputBar 
                        style={styles.inputbar} 
                        keypress={(a) => this.handleInputkey(a)} 
                        txtToSpeech={ (a) => this.handleInputkey(a)}
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
