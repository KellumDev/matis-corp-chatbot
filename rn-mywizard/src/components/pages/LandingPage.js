import React from 'react';
import Chatbot from '../chatbot/chatbot';
//import img from '../../images/mywizardbk.jpg'; 
const Landing = () => {
    return (
        
        <div className="Landing-Page" style={styles.background} >
           
            <h1>myWizard Chatbot</h1>
            <h2>baby mantis proto</h2>
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
     
        
    }
};

export default Landing;
