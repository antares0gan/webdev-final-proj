import React from 'react';

import CustomizedNavbar from '../components/navbar.component';
import '../../public/style.css';
import Img1 from '../../public/assets/premium_black_1.jpg';
import Img2 from '../../public/assets/premium_black_2.jpg';
import Img3 from '../../public/assets/premium_black_3.jpg';

class PremiumBlack extends React.Component {
  render() {
    return (
      <div>
        <CustomizedNavbar></CustomizedNavbar>
        <img id="ad-image" src={Img2} class="img-fluid" alt="premium2"/>
        <img id="ad-image" src={Img3} class="img-fluid" alt="premium3"/>
        <img id="ad-image" src={Img1} class="img-fluid" alt="premium1"/>
      </div>
    )
  }
}

export default PremiumBlack;