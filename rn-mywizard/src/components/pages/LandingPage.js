import React from 'react';
import Chatbot from '../chatbot/chatbot'; 
import Loader from '../loader/loader'; 
import Logo from '../banner/banner'; 

const Landing = () => {
    return (
        
        <div className="Landing-Page" style={styles.background} >
            
             <Loader/>
             <Logo />
            <Chatbot />
        </div>
    )
} 
const styles = {
    background: {
        margin: '5%', 
    }
};

export default Landing;
