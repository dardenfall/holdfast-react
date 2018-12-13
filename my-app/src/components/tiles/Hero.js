import React from 'react';
import Util from '../../Util';

const Hero = (props) => {
  let cn = "";

  switch (props.direction) {
    case Util.DIRECTION.RIGHT:
      cn = "hero-right";
      break;
    case Util.DIRECTION.LEFT:
      cn = "hero-left";
      break;
    case Util.DIRECTION.DOWN:
      cn = "hero-down";
      break;
    case Util.DIRECTION.UP:
      cn = "hero-up";
      break;
  
    default:
      throw Error("NO DIRECTION PASSED TO HERO")
  }
  return (
    <div className={cn}></div>
  );
}


export default Hero;