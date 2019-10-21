import React, { Component } from 'react';
import axios from "axios/index";

import Message from './message';
import Input from './inputBox'; 
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
        console.alert('clicked'); 
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
                    <input style={styles.inputbar} type="text" onKeyPress={(a) => this.handleInputkey(a)} />
                </div>
            </div>
        )
    }
}//end chatbot



const styles = {
    cbcontainer: {
       // backgroundColor: 'red',
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

    },

    inputbar: {
        color: '#97ca3d',
        backgroundColor: '#1a237e',
        paddingTop: '3%',
        paddingBottom: '3%',
        fontSize: '1.4em'
        
        //border: 'solid px #1a237e',
       // borderBottomLeftRadius: '2px',
        // borderBottomRightRadius: '2px',
        // borderTopLeftRadius: '2px',
        // borderTopRightRadius: '2px',
     //  padding: '2%'
    }
}

export default Chatbot; 
