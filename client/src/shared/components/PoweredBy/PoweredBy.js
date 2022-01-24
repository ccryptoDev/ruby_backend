import React from 'react';
import img_stitch_mark from "../../assets/images/stitch_mark.png";

import './PoweredBy.scss';

const PoweredBy = () => {
  return (
    <div className="powered-by" style={{marginLeft:"36px"}}>
      <span>Powered By</span> 
      <img src={img_stitch_mark} width="130" height="33" alt="stitch mark img" />
    </div>
  )
}

export default PoweredBy;