import React from 'react'; 

import Logo from '../../components/images/mywizardbanner.png'; 
 
 
const Banner = () => {
    return (
        
        <div className="Banner-Page" style={styles.logo} >
               <img src={Logo} alt="Hey-myWizard-logo" />
        </div>
    )
} 

const styles = {
    logo: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        margin: '20px', 
    }
};

export default Banner;
