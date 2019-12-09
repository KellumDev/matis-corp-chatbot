import React from 'react';
import cssGlobal from '../../css/globalStyles'

const Message = (props) => {
    return (

        <div className="col s12 m8 offset-m2 l6 offset-l3"  >
            {/* <div className="card-panel purple darken-4 lighten-5 z-depth-1"> */}
            <div className="row valign-wrapper" style={styles.rowValignWrapper}  >
                {props.speaks === 'bot' &&
                    <div className="col s3" style={styles.botSpeaks} >
                        <a href="/#" className="btn-floating btn-large waves-effect waves-light  blue lighten-3" style={styles.botSpeaks} >{props.speaks}</a>
                    </div>
                }
                <div className="col s10" style={styles.text}   >
                    <span  className="spanText" style={styles.spanText} >
                        {props.text}
                    </span>
                </div>
                {props.speaks === 'user' &&
                    <div className="col s3" style={styles.userSpeaks}>
                        <a href="/#" className="btn-floating btn-large waves-effect waves-light  blue lighten-4">{props.speaks}</a>
                    </div>
                }
            </div>
            {/* </div> */}
        </div>

    );
};
//console.log(props.keys ) key={ props.keys%2 ? styles.botSpeaks.backgroundColor = 'red' :  console.log('user input'  ) } key={ props.keys%2 ?  console.log('bot output'  ) :  Object.assign( {},styles.text, newStyles.text ) }
const styles = {
    rowValignWrapper: {
         width: '90%',
        marginRight: '2%'
        
    },
    text: {
        backgroundColor: cssGlobal.gray ,
        border: cssGlobal.gray,
        borderRadius: '24px',
        width: '71%',
        padding: '2%',
        textAlign: 'left', 
        textColor: cssGlobal.black
    },
    spanText: {
        color: cssGlobal.black
    },
    botSpeaks: {
        marginLeft: '0%',
        color: cssGlobal.botIcons ,
    },
    userSpeaks: {
       
    }
}

const newStyles = {
    
    text: {
        marginLeft: '-54%',
    },
    userSpeaks: {
        marginLeft: '84%',
    }
}


export default Message;