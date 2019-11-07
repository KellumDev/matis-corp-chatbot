import React from 'react';

const InputBox = (props) => {

    return (
        <div id="mw-inputbox" style={styles.inputContainer} className="row">
            <div className="col  m12">
                <div className="card indigo">
                    <div className="card-content white-text">

                        <input className="textinput" type="text"  minLength="4" maxLength="48"  
                            value={props.transcript}
                            onChange={props.change}
                            onKeyPress={props.onkeypress}
                        />
                        <button style={styles.buttonBar} className="btn waves-effect waves-light" onClick={props.click} name="mantis"><i className="mic"> </i> Voice </button>
                    </div>
                </div>
                

            </div>
        </div>
    )


}
const styles = {
    inputContainer: {
        position: 'relative',
        top: '225px',    
    },
    buttonBar: {
        position: 'relative',
        right: '43%' 
    }
}


export default InputBox;
