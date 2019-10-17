import React, { Component } from 'react';

import axios from "axios/index";

import Message from './message';

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
                    speak: 'bot',
                    msg: msg
                }
                this.setState({ messages: [...this.state.messages, says] });
            }
            console.log(['*********CLIENT STRUCTURE**********\n'],response);
        }

        );
 
    }//end textQueryWrapper

    renderMessages(returnedMessages) {
        if (returnedMessages) {
            return returnedMessages.map((message, i) => {
                return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />;
            })
        } else {
            return '[*NO MESSAGES*]';
        }
    }

    // componentDidMount() {
    //     console.log('[WELCOME TO MY WIZARD CHATBOT]');
    // }

    handleInputkey(e) { 
        let a = e.target.value
        console.log(a); 
        if (e.key === 'Enter') {
            //e.target.value = 'hello';
            this.textQueryWrapper(a);

        }
    }

    render() {
        return (
            <div style={{
                height: 400, width: 400, marginLeft: '30%', borderColor: 'black',
                borderWidth: 1
            }}>
                <div id="chatbot" style={{ height: '100%', width: '100%', overflow: 'auto' }}>
                    <h2>Chatbot</h2>
                    {this.renderMessages(this.state.messages)}
                    <input type="text" onKeyPress={ (a) => this.handleInputkey(a)} />
                </div>
            </div>
        )
    }
}



// const styles = StyleSheet.create({
//     bigblue: {
//             color: 'blue',
//             fontWeight: 'bold',
//             fontSize: 20,
//             borderColor: 'black',
//             borderWidth: 1
//     }
// }); 

export default Chatbot; 
