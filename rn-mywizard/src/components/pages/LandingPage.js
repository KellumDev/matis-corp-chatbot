import React from 'react';
import Chatbot from '../chatbot/chatbot';
import Input from '../chatbot/inputBox'; 
//import img from '../../images/mywizardbk.jpg'; 
const Landing = () => {
    return (
        
        <div className="Landing-Page" style={styles.background} >
            <h1>myWizard Chatbot</h1>
            <h2>Green mantis proto</h2>
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
