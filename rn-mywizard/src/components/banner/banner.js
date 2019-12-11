import React from 'react'; 

import LogoBanner from '../../components/images/mywizardbanner.png'; 
 
 
const Banner = () => {
    return (
        
        <div style={styles.container} className="banner-page" >
               <img  style={styles.logo} src={LogoBanner} alt="Hey-myWizard-logo" />
        </div>
    )
} 

const styles = {
    container: {
        margin:' 2%,',
        position:' absolute',
        top: '-2%',
        float:' left',
        // width:' 30%',
        left: '0%',
    
     },
    logo: {
       width: '55%'
    }
};

export default Banner;
