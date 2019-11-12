import React from 'react';

 const ShowDetail = () => {
  return (
    <div style={styles.loaderImage} className="loader center">
      <i className="fas fa-spinner fa-pulse" />
    </div>
  );
}
 
const styles = {
    loaderImage: {
       zoom: 9
    }
};


export default ShowDetail;