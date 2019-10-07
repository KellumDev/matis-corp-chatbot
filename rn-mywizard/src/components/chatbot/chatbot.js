import React, { Component } from 'react';

import axios from "axios/index";

import Message from './message';

class Chatbot extends Component {
   
    state = { 
        messages: []
    }

    text_query = (text) =>{
        let url = '/api/text_query'; 
        const res = await axios.post(url, {text}); 
    } 

    renderMessages(returnedMessages) {
        if (returnedMessages) {
            return returnedMessages.map((message, i) => {
                return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />;
            }
            )
        } else {
            return null;
        }
    }


    render() {
        return (
            <div style={{ height: 400, width: 400, marginLeft: '30%', borderColor: 'black',
            borderWidth: 1 }}>
                <div id="chatbot" style={{ height: '100%', width: '100%', overflow: 'auto' }}>
                    <h2>Chatbot</h2>
                    {this.renderMessages(this.state.messages)}
                    <input type="text" />
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
