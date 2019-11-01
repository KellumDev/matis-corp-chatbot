import React, { Component } from 'react';
import axios from "axios/index";

import Message from './message';
import SingleBotmessage from './SingleBotMessage'

import InputBox from './inputBox';

const SpeechRecognition = window.webkitSpeechRecognition
const reconition = new SpeechRecognition()

//------------------------SPEECH SYNTHESIS----------------------------- 

/**
 * C:\Users\austin.kellum\Documents\matis-corp-chatbot\Developmens\config\mywiz_new_agent.json
 * $env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\austin.kellum\Documents\matis-corp-chatbot\Developmens\config\mywiz_new_agent.json"
 ####    set GOOGLE_APPLICATION_CREDENTIALS="C:\Users\austin.kellum\Documents\matis-corp-chatbot\Developmens\config\mywiz_new_agent.json"
 */
const synth = window.speechSynthesis;


class Chatbot extends Component {


    state = {
        listening: false,
        finalTranscript: "",
        messages: [],
        SingleBotmessage: '',
        welcomeMessage: 'Welcome to myWizard. How may I help you?'
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
                this.setState({ SingleBotmessage: msg });
            }
            console.log(['*********CLIENT STRUCTURE**********\n'], response);
        }

        );

    }//end textQueryWrapper


    handleInputkey = async (e) => {
        let a = e.target.value
        console.log(a);

        let expression = this.state.listening;
        switch (expression) {
            case false:
                if (e.key === 'Enter') {
                    this.textQueryWrapper(a);
                }
                //   this.speechhandler(this.state.ttFinalTranscript);
                console.log('[ SPEECH OFF ]');
                break;
            case true:

                this.speechHandle();
                if (e.key === 'Enter') {
                    this.textQueryWrapper(a);
                    setTimeout(() => {
                        /**
                         * let  messages = this.state.messages[],
                                lastmessage = messages.length -1,
                                result = lastmessage.msg.text.text[0];
                            ;
                             
                         */
                       let messages = this.state.messages[1].msg.text.text[0];
                         
                        console.log('[ VOICE  RESPONSE ] \n', messages);
                        this.voiceOutput(messages);
                    }, 3000);
                }

                console.log('[ SPEECH ON ]');
                // use voice to text and text to voice 


                break;
            default:
            // code block
        }
    }

    speechHandle = async () => {

        const listen = this.state.listening;

        if (!listen) {

            this.setState({ listening: true });

            console.log('[START REC] \n');
            reconition.continous = true
            reconition.interimResults = true
            reconition.lang = 'en-US'
            reconition.start()

            console.log('reconition started');
            //get results from reconition 
            reconition.addEventListener('result', e => {
                // console.log(e.results)
                const results = e.results;
                //transverse through array 
                const transcript = Array.from(results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    //join the two arrays at the end
                    .join('')

                reconition.onresult = () => {
                    console.log(transcript);
                    this.setState({ finalTranscript: transcript });
                    return transcript;
                };
            })//end if

        } else if (listen) {

            console.log('[STOP]')
            reconition.stop();
            this.setState({ listening: false });
        }
    }//end speechHandle


    voiceOutput = (input) => {

        console.log('[VOICE ENABLED]');
        var utterThis = new SpeechSynthesisUtterance(input);
        synth.speak(utterThis);

    }

    transcriptHandler = () => {
        return this.state.finalTranscript;
    }

    keyStrokeHandler = (event) => {
        let keystroke = event.target.value;
        this.setState({ finalTranscript: keystroke })
    }

    componentDidMount = () => {
        setTimeout( () => {
            let speaks = 'bot'
            console.log(this.state.welcomeMessage);
                return <SingleBotmessage speaks={speaks} text={this.state.welcomeMessage} />; 
          
            
           
        } , 2000)
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
                    {/* <SingleBotmessage speaks={'bot'} text={this.state.welcomeMessage} /> */}
                    <InputBox
                        click={this.speechHandle}
                        transcript={this.state.finalTranscript}
                        change={this.keyStrokeHandler || this.transcriptHandler}
                        onkeypress={this.handleInputkey}

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
        //marginLeft: '30%',
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
