import React from 'react';
import Util from '../../Util';

class Hero extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.myRef = React.createRef();
  }

  render(){
    let cn = "";

    switch (this.props.direction) {
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

  componentDidMount() {
//    $(this.myRef).effect( "bounce", {times:3}, 300 ); // eslint-disable-line
console.log("component mounted")
  }
  
}


export default Hero;