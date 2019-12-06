import React, { Component } from 'react';
import Chatbot from '../chatbot/chatbot';
//import Loader from '../loader/loader'; 
import MwBackground from '../../components/images/myWizardpagerevised.png';
import Logo from '../banner/banner';


import { Modal, Button, Row, Col, Image } from 'react-bootstrap';

class Landing extends Component {

    state = {
        show: false
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }


    render() {



        return (
            <div className="Landing-Page" style={styles.background} >
                {/* 
                <Logo />

                <Chatbot /> */}

                <Row>
                    <Col  >
                        <Image className="mw-background" src={MwBackground} style={styles.mwbackground} responsive />
                        <Button className="chatbot-button" bsstyle="primary" bsSize="large" onClick={this.handleShow}>
                            Launch Hey myWizard
                            </Button>

                        <Modal show={this.state.show} onHide={this.handleClose}>
                            <Logo/>
                            <Chatbot />
                        </Modal>
                    </Col>
                </Row>

            </div>
        )
    }



}
const styles = {
    background: {
        margin: '5%'
    },
    mwbackground: {
        maxWidth: '1107px'
    }
};

export default Landing;
