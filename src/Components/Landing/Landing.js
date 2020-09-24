import React from "react";
import imageOne from "../../illustrations/04.png";
import "../../Styles/Landing.css";

export default function Landing() {
  return (
    <>
      <div className="landingDiv">
        <img src={imageOne} alt="glasses" className="landingImg" />
        <h3 className="landingH3">A journal for menswear 🕊</h3>
      </div>
    </>
  );
}
