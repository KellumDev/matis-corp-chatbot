import React from 'react';

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
        color: '#97ca3d'
    }
};


export default ShowDetail;