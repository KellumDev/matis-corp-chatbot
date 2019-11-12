import React from 'react'; 

import LogoBanner from '../../components/images/mywizardbanner.png'; 
 
 
const Banner = () => {
    return (
        
        <div style={styles.container} className="Banner-Page" >
               <img  style={styles.logo} src={LogoBanner} alt="Hey-myWizard-logo" />
        </div>
    )
} 

const styles = {
    container: {
        margin: '2%'
     },
    logo: {
       width: '95%'
    }
};

export default Banner;
