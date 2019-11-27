import React from 'react';
import cssGlobal from '../../css/globalStyles'; 

const SingleMessage = (props) => {
    return (

        <div id={props.id} className="col s12 m8 offset-m2 l6 offset-l3 single-message">

            <div className="row valign-wrapper"  style={styles.rowValignWrapper} >
                {props.speaks === 'bot' &&
                    <div className="col s3">
                        <a href="/#" className="btn-floating btn-large waves-effect waves-light  blue lighten-3">{props.speaks}</a>
                    </div>
                }
                <div className="col s10" style={styles.text} >
                    <span className="spanText" style={styles.spanText} >
                        {props.text}
                    </span>
                </div>
            </div>

        </div>

    );
};

const styles = {
    rowValignWrapper: {
        width: '90%',
    },
    text: {
        backgroundColor: cssGlobal.gray,
        border: cssGlobal.gray,
        textColor: cssGlobal.black,
        borderRadius: '24px',
        width: '71%',
        padding: '2%'
    },
     spanText: {
         color: cssGlobal.black
     }
    // bubbleTail: {
    //     width: '0',
    //     height: '0',
    //     borderBottom: ' 10px solid rebeccapurple',
    //     borderRight: '100px solid transparent',
    //   }
}
export default SingleMessage;