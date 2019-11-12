import React from 'react';

 const ShowDetail = () => {
  return (
    <div style={styles.loaderImage} className="loader center">
      <i className="fa fa-cog fa-spin" />
    </div>
  );
}
 
const styles = {
    loaderImage: {
       zoom: 9
    }
};


export default ShowDetail;