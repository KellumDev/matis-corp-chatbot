import React, { Component } from 'react';
import axios from "axios/index";

import Message from './message';
import SingleBotmessage from './SingleBotMessage'

import InputBox from './inputBox';
import Loader from '../loader/loader';

import '../../css/chatbotStyle.css';
import cssGlobal from '../../css/globalStyles'; 

const SpeechRecognition = window.webkitSpeechRecognition;
const reconition = new SpeechRecognition()

//------------------------SPEECH SYNTHESIS----------------------------- 

/**
 * C:\Users\austin.kellum\Documents\matis-corp-chatbot\Developmens\config\mywiz_new_agent.json
 * $env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\austin.kellum\Documents\matis-corp-chatbot\Developmens\config\mywiz_new_agent.json"
 ####    set GOOGLE_APPLICATION_CREDENTIALS="C:\Users\austin.kellum\Documents\matis-corp-chatbot\Developmens\config\mywiz_new_agent.json"
 */

const synth = window.speechSynthesis;
const synthTwo = window.speechSynthesis;


class Chatbot extends Component {

    messagesEnd;

    state = {
        listening: false,
        finalTranscript: "",
        messages: [],
        BotResponse: '',
        welcomeMessage: '',
        defaultWelcomeMessage: 'Hello! Welcome to myWizard. How can I assist you?',
        loading: true,
        mic: [
            { on: 'fas fa-microphone' },
            { off: 'fas fa-microphone-slash' }
        ],

    }
    textQueryWrapper = async (text) => {
        let url = 'http://35.223.93.13:443/api_dftext';
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
                this.setState({ BotResponse: msg.text.text[0] });
            }
            console.log(['*********CLIENT STRUCTURE**********\n'], response);
        }

        );
        return;
    }//end textQueryWrapper

    clearInputHandler = () => {

        let a = "";
        this.setState({ finalTranscript: a });
        return;
    }

    sendButtonHandler = () => {

        let finalTranscript = this.state.finalTranscript;

        let listening = this.state.listening; 
         
        if (!listening) {

            this.textQueryWrapper(finalTranscript);
            this.clearInputHandler();

        }
        else if (listening) {
            
                this.textQueryWrapper(finalTranscript);
                this.clearInputHandler();

                setTimeout(() => {
                    //get the last message from the array of messages , last message is the bot 
                    let messages = [...this.state.messages],
                        botmessage = messages.slice(-1)[0].msg.text.text[0];

                    console.log('[ VOICE  RESPONSE ] \n', botmessage);
                    this.voiceOutput(botmessage);
                }, 8000);
        }
    }

    handleInputkey = async (e) => {
        //set the transcript with keystrokes
        let a = e.target.value
        this.setState({ finalTranscript: a })

        let finalTranscript = this.state.finalTranscript;
        //if the voice button was clicked then voice output should be used 
        let listening = this.state.listening;
        // send button was clicked ;
        let sendButtonBoolean = this.state.sendButtonBool;

        if (!listening) {

            if (e.key === 'Enter') {
                this.textQueryWrapper(finalTranscript);
                this.clearInputHandler();
            }

        }
        else if (listening) {
            if (e.key === 'Enter') {
                this.textQueryWrapper(finalTranscript);
                this.clearInputHandler();

                setTimeout(() => {
                    //get the last message from the array of messages , last message is the bot 
                    let messages = [...this.state.messages],
                        botmessage = messages.slice(-1)[0].msg.text.text[0];

                    console.log('[ VOICE  RESPONSE ] \n', botmessage);
                    this.voiceOutput(botmessage);
                }, 8000);

            }

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
            synth.cancel();
            this.setState({ listening: false });

        }
    }//end speechHandle


    voiceOutput = (input) => {
        console.log('[VOICE ENABLED]');
        var utterThis = new SpeechSynthesisUtterance(input);
        synth.speak(utterThis);
        return;
    }

    transcriptHandler = () => {
        return this.state.finalTranscript;
    }

    keyStrokeHandler = (event) => {
        let keystroke = event.target.value;
        this.setState({ finalTranscript: keystroke })
    }

    componentDidMount = () => {

        setTimeout(() => {

            this.welcomeMessage();
        }, 3000)
    }

    componentDidUpdate= () => {

       this.scrollHandler(); 
    }

    welcomeMessage = async () => {

        let url = 'http://35.223.93.13:443/api_dfevent';


        axios.post(url).then(response => {
            console.log('[*********** DF WELCOME EVENT **********]\n', response);

            let welcome = response.data.fulfillmentText;
            this.setState({ loading: false });
            this.setState({ welcomeMessage: welcome });
            let input = this.state.welcomeMessage;
            var utterThis = new SpeechSynthesisUtterance(input);
            synthTwo.speak(utterThis);

        }).catch((err) => {

            console.log('[ERROR******] \n', err);
            //  this.welcomeMessage(); 
            let defaultWelcomeMessage = this.state.defaultWelcomeMessage;
            this.setState({ welcomeMessage: defaultWelcomeMessage });
        });

    }

    renderMessages = (returnedMessages) => {
        if (returnedMessages) {
            return returnedMessages.map((message, i) => {
                return <Message keys={i} speaks={message.speaks} text={message.msg.text.text} />;
            })
        } else {
            return '[*NO MESSAGES*]';
        }
    }

    scrollHandler = () => {
        this.messagesEnd.scrollIntoView({
            behavior: 'smooth'
          });
    }

    microphoneHandler = () => {
        let listen = this.state.listening;
        let off = this.state.mic[1].off;
        let on = this.state.mic[0].on;
        switch (listen) {
            case false:

                //this.setState({listening: false});
                console.log('[off]');
                return off
            //
            case true:
                // this.speechHandle() ;
                console.log('[on] \n', on);
                return on

            default:
                return off;

        }
    }

    render() {

        let heyMywizardWelcom = "";
        let loader = ""; 
          

        if (this.state.loading) {
            loader = <Loader />;
        } else {
            heyMywizardWelcom = <SingleBotmessage id={"welc-message"} speaks={'bot'} text={this.state.welcomeMessage} />;
        }

        return (
            <div style={styles.cbcontainer} >

                <div >
                    <div id="chatbot" style={styles.messagesContainer}>
                        {loader}
                        {heyMywizardWelcom}
                        {this.renderMessages(this.state.messages)}
                        <div ref={ (el)=> {this.messagesEnd = el; }} style={{float: 'left', clear: 'both'}}>
                            </div>
                    </div>
                </div>
                <InputBox
                    click={this.speechHandle}
                    clickTwo={this.sendButtonHandler}
                    transcript={this.state.finalTranscript}
                    change={this.keyStrokeHandler || this.transcriptHandler}
                    onkeypress={this.handleInputkey}
                    micOnOff={this.microphoneHandler()}
                />
            </div>

        )
    }
}//end chatbot

const styles = {
    messagesContainer: {
        height: '200px',
        width: '100%',
        overflow: 'auto', 
        padding: '1%'
    },
    cbcontainer: {
        backgroundColor: 'white',
        height: '10%', 
        border: 'solid 5px #a2c6f6',
        padding: '2%',
        paddingLeft: '3%',
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        position: 'relative',
        top: '40px'
    },
    message: {
        clear: 'both',
        float: 'left'
    }

}

export default Chatbot; 
