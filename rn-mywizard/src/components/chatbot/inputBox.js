import React from 'react';
import cssGlobal from '../../css/globalStyles';
const InputBox = (props) => {

    return (
 

        <div id="mw-inputbox" style={styles.inputContainer} className="row">
            <ul className="collection" style={styles.collection} >
                <li className="collection-item">
                    <input className="textinput" style={styles.inputBox}
                        type="text" minLength="4"
                        maxLength="150" placeholder="Type new message here"
                        value={props.transcript}
                        onChange={props.change}
                        onKeyPress={props.onkeypress}
                    />
                    <div className="row valign-wrapper" style={styles.rowValignWrapper}>
                        <button style={styles.buttonTwo} className="btn waves-effect waves-light" onClick={props.clickTwo} name="mantis">Send <i className="fas fa-paper-plane"></i></button>
                        <button style={styles.buttonOne} className="btn waves-effect waves-light" onClick={props.click} name="mantis"><i className={props.micOnOff}></i></button>
                    </div>
                </li>
            </ul>

        </div>
    )


}
const styles = {
    inputBox: {
        color: 'black',
        borderBottom: cssGlobal.lightGrayBorder,
        boxShadow: 'none'
    },
    inputContainer: {
        width: '100%',
        height: '50%',
        color: 'white',
        marginBottom: '0%',
        boxShadow: 'red'
    },
    collection: {
        border: 'none',
        width: '100%'

    },
    rowValignWrapper: {
        marginBottom: '0%'
    },
    buttonTwo: {
        marginLeft: '1.5%',
        backgroundColor: cssGlobal.lightBlue
    },
    buttonOne: {
        marginLeft: '1%',
        backgroundColor: cssGlobal.lightBlue
    }
}


export default InputBox;
