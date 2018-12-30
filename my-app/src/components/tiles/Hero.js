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
      <div className={cn + " tile"} ref={this.myRef}></div>
    );
  }

  componentDidMount() {
    let self = this;
    // console.log(self.myRef.current.style);
    // setTimeout(() => 
      
    //   self.myRef.current.style.transform = "translateX(10px)"
    //   ,1000)
  }
  
}


export default Hero;