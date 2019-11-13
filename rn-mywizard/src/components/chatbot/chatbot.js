import React, { Component } from 'react';
import axios from "axios/index";

import Message from './message';
import SingleBotmessage from './SingleBotMessage'

import InputBox from './inputBox';
import Loader from '../loader/loader';

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
        SingleBotmessage: '',
        welcomeMessage: '',
        defaultWelcomeMessage: 'Hello! Welcome to myWizard. How can I assist you?',
        loading: true,
        mic: [
            { on: 'fas fa-microphone' },
            { off: 'fas fa-microphone-slash' }
        ],
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

    clearInputHandler = () => {

        let a = "";
        this.setState({ finalTranscript: a });
    }

    sendButtonHandler = () => {

        let finalTranscript = this.state.finalTranscript;

        this.textQueryWrapper(finalTranscript);
        this.clearInputHandler();
    }

    handleInputkey = async (e) => {
        //set the transcript with keystrokes
        let a = e.target.value
        this.setState({ finalTranscript: a })
        let finalTranscript = this.state.finalTranscript;
        //if the voice button was clicked then voice output should be used 
        let expression = this.state.listening;

        switch (expression) {
            case false:

                if (e.key === 'Enter') {
                    this.textQueryWrapper(finalTranscript);
                    this.clearInputHandler();
                }
                //   this.speechhandler(this.state.ttFinalTranscript);
                console.log('[ SPEECH IS OFF ]');
                break;

            case true:

                console.log('[ SPEECH IS ON ]');
                this.speechHandle();
                if (e.key === 'Enter') {
                    this.textQueryWrapper(finalTranscript);
                    this.clearInputHandler();
                    setTimeout(() => {

                        let messages = [...this.state.messages],
                            botmessage = messages.slice(-1)[0].msg.text.text[0];

                        console.log('[ VOICE  RESPONSE ] \n', botmessage);
                        this.voiceOutput(botmessage);
                    }, 3000);
                }

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
            synth.cancel();
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
 
        setTimeout(() => {
            
            this.welcomeMessage();
        }, 3000)
    }

    welcomeMessage = async () => {

        let url = 'http://localhost:5000/api_dfevent';


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
                return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />;
            })
        } else {
            return '[*NO MESSAGES*]';
        }
    }

    microphoneHandler = () => {
        let listen = this.state.listening;
        let off = this.state.mic[1].off;
        let on = this.state.mic[0].on;
        switch (listen) {
            case false:
                console.log('[off]');
                return off

            case true:
                console.log('[on] \n', on);
                return on

            default:
                return off;

        }
    }



    render() {
        let heyMywizardWelcom = "";
        let loader = ""

        if (this.state.loading) {
            loader = <Loader />;
        } else {
            heyMywizardWelcom = <SingleBotmessage id={"welc-message"} speaks={'bot'} text={this.state.welcomeMessage} />;
        }

        return (

            <div style={styles.cbcontainer}>
                <div id="chatbot" style={{ height: '550px', width: '100%', overflow: 'auto' }}>
                    {loader}
                    {heyMywizardWelcom}
                    {this.renderMessages(this.state.messages)}

                    <InputBox
                        click={this.speechHandle}
                        clickTwo={this.sendButtonHandler}
                        transcript={this.state.finalTranscript}
                        change={this.keyStrokeHandler || this.transcriptHandler}
                        onkeypress={this.handleInputkey}
                        micOnOff={this.microphoneHandler()}
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
    message: {
        clear: 'both',
        float: 'left'
    }

}

export default Chatbot; 
