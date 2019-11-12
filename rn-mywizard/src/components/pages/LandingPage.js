import React from 'react';
import Chatbot from '../chatbot/chatbot'; 

import Logo from '../banner/banner'; 

const Landing = () => {
    return (
        
        <div className="Landing-Page" style={styles.background} >
           
             <Logo />
            <Chatbot />
        </div>
    )
} 
const styles = {
    background: {
      
        margin: '20px', 

      // backgroundImage: src={require('./images/abstract-access.jpg’')},
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        
       // backgroundColor: 'red',
        
    }
};

export default Landing;
