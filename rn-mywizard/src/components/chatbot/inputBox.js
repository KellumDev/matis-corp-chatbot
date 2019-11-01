import React from 'react';

const InputBox = (props) => {
 
    return (
        <div className="row">
            <div className="col  m12">
                <div className="card indigo">
                    <div className="card-content white-text">

                        <input className="textinput" type="text"
                            value={props.transcript}
                            onChange={props.change}
                            onKeyPress={props.onkeypress}
                        />
                    </div>
                </div> 
                <button  className="btn waves-effect waves-light" onClick={props.click} name="mantis"><i className="mic"> </i> Start </button>
 
            </div>
        </div>
    )


}

export default InputBox;
