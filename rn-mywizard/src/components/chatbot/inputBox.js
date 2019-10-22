import React from 'react';


const inputBox = (props) => {
    return (
        <div className="row">
            <div className="col s12">
                <div className="card indigo">
                    <div className="card-content white-text">

                        <input type="text" onKeyPress={props.keypress} onChange={props.txtToSpeech }/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default inputBox;
