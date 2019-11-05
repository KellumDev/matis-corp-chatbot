import React from 'react';
import Chatbot from '../chatbot/chatbot';
// import Input from '../chatbot/inputBox'; 
// import TestTextToSpeech from '../textToSpeech/testTextToSpeech'; 
// import RnSpeechKit from '../textToSpeech/rnSpeechKit';
// import Speech from '../textToSpeech/Speech'; 
const Landing = () => {
    return (
        
        <div className="Landing-Page" style={styles.background} >
              
            <h1>Hey myWizard!</h1>
            
            <Chatbot />
        </div>
    )
}
//url(${img})
//const img = '../../images/mywizardbk.jpg'; 
const styles = {
    background: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
      // backgroundImage: src={require('./images/abstract-access.jpg’')},
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        
       // backgroundColor: 'red',
        
    }
};

export default Landing;
