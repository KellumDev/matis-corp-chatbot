import React from 'react';
import cssGlobal from '../../css/globalStyles';
 const ShowDetail = () => {
  return (
    <div style={styles.loaderImage} className="loader center">
      <i style={styles.spinner} className="fas fa-spinner fa-pulse" />
    </div>
  );
}
 
const styles = {
    loaderImage: {
       zoom: 4
    },
    spinner: {
        color: cssGlobal.lightBlue
    }
};


export default ShowDetail;