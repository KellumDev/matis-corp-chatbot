import React from 'react';

const InputBox = (props) => {
 
    return (
        <div className="row">
            <div className="col s12 m12">
                <div className="card indigo">
                    <div className="card-content white-text">

                        <input className="textinput" type="text"
                            defaultValue={props.paramsAtranscript}
                            onKeyPress={props.paramsCkeyinput}
                        />
                    </div>
                </div> 
                <a  className="btn waves-effect waves-light" onClick={props.click} name="mantis"><i className="mic"> </i>  </a>
 
            </div>
        </div>
    )


}

export default InputBox;
