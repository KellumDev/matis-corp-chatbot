import React, { Component } from 'react';
import Chatbot from '../chatbot/chatbot';
//import Loader from '../loader/loader'; 
import Logo from '../banner/banner';

import { Accordion, Card, Button } from 'react-bootstrap';

class Landing extends Component {

    state = {
        show: false
    }
    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }


    render() {
        return (
            <div className="Landing-Page" style={styles.background} >

                <Logo />

                <Chatbot />

            </div>
        )
    }



}
const styles = {
    background: {
        margin: '5%'
    }
};

export default Landing;
