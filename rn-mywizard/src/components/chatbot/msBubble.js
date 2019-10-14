import React from 'react';

const msBubble = (props) => {
    return (

        <div style={{
            float: 'right',
            margin: '1%',
            border: '1px solid #008080',
            backgroundColor: '#f3e6ff',
            padding: '2%',
            borderRadius: '8%',
            textAlign: 'center'
            // height: 400, width: 400, marginLeft: '30%', borderColor: 'black',
            // borderWidth: 1
        }} className="col s12 m8 offset-m2 l6 offset-l3">
             
             <h5>{props.messagetext}</h5>
        </div>

    );
};

export default msBubble;

/**
 <div style={{
                height: 400, width: 400, marginLeft: '30%', borderColor: 'black',
                borderWidth: 1
            }}>
*/