import React from 'react';


const inputBox = (props) => {
    return (
        <div className="row">
            <div className="col s12 m6">
                <div className="card indigo">
                    <div className="card-content white-text">

                        <input type="text" onKeyPress={props.keypress}  />
                    </div>

                </div>
            </div>
        </div>
        

    );
};

export default inputBox;
