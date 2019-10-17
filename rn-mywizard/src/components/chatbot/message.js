import React from 'react';

const Message = (props) => {
    return (

        <div className="col s12 m8 offset-m2 l6 offset-l3">
            <div className="card-panel purple darken-4 lighten-5 z-depth-1">
                <div className="row valign-wrapper">
                    {props.speaks === 'bot' &&
                        <div className="col s3">
                            <a className="btn-floating btn-large waves-effect waves-light purple accent-1">{props.speaks}</a>
                        </div>
                    }
                    <div className="col s10">
                        <span className="white-text">
                            {props.text}
                        </span>
                    </div>
                    {props.speaks === 'user' &&
                        <div className="col s3">
                            <a className="btn-floating btn-large waves-effect waves-light purple accent-4">{props.speaks}</a>
                        </div>
                    }
                </div>
            </div>
        </div>

    );
};

export default Message;