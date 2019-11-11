import React from 'react';

const InputBox = (props) => {

    return (
        <div id="mw-inputbox" style={styles.inputContainer} className="row">
            <div className="col  m12">
                <div className="card indigo">
                    <div className="card-content white-text">

                        <input style={styles.inputBox}  className="textinput" 
                            type="text" minLength="4" 
                            maxLength="150" placeholder="Type new message here"
                            value={props.transcript}
                            onChange={props.change}
                            onKeyPress={props.onkeypress}
                        />
                        <div className="row valign-wrapper">
                            <button style={styles.buttonTwo} className="btn waves-effect waves-light" onClick={props.clickTwo} name="mantis">Send <i className="fas fa-paper-plane"></i></button>
                            <button style={styles.buttonOne} className="btn waves-effect waves-light" onClick={props.click} name="mantis"><i className={props.micOnOff}></i></button>
                        </div>

                    </div>
                </div>


            </div>
        </div>
    )


}
const styles = {
    inputBox: {
        color: 'white'
    }, 
    inputContainer: {
        position: 'relative',
        color: 'white'
        //  top: '225px',    
    },
    buttonTwo: {
        marginLeft: '1.5%'
        //  right: '43%'
    },
    buttonOne: {
        marginLeft: '1%'
        // position: 'relative',
        //  right: '43%'
    }
}


export default InputBox;
