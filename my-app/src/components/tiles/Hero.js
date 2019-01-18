import React from 'react';
import Util from '../../Util';

class Hero extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.myRef = React.createRef();
  }

  bounce(direction){
    let transitionCodeString = "";
    let transitionNumber = 0;
    switch(direction){

      case Util.DIRECTION.RIGHT:
        transitionCodeString = "translateX(";
        transitionNumber = 10;
        break;
      case Util.DIRECTION.LEFT:
        transitionCodeString = "translateX(";
        transitionNumber = -10;
        break;
      case Util.DIRECTION.DOWN:
        transitionCodeString = "translateY(";
        transitionNumber = 10;
        break;
      case Util.DIRECTION.UP:
        transitionCodeString = "translateY(";
        transitionNumber = -10;
        break;
    
      default:
        throw Error("missing direction in hero bounce")
    }

    let self = this;
    let timeTransition = 0;
    do {
      let code = transitionCodeString + transitionNumber + "px)";
      console.log(code,transitionCodeString,transitionNumber)
      
      setTimeout(() => {
        //in the case that the user moved off of the tile before the animation had a chance to run
        if(!self.myRef || !self.myRef.current){
          return;
        }

        self.myRef.current.style.transform = code
      },timeTransition);    
      
      timeTransition = 200;
      if(transitionNumber<0){
        transitionNumber++;
      } 
      else{
        transitionNumber--;
      }

    } while(Math.abs(transitionNumber) !== 0)

    if(self.myRef && self.myRef.current){
      self.myRef.current.scrollIntoView();
    }

  }

  render(){
    let cn = "";

    switch (this.props.direction) {
      case Util.DIRECTION.RIGHT:
        cn = "hero hero-right";
        break;
      case Util.DIRECTION.LEFT:
        cn = "hero hero-left";
        break;
      case Util.DIRECTION.DOWN:
        cn = "hero hero-down";
        break;
      case Util.DIRECTION.UP:
        cn = "hero hero-up";
        break;
    
      default:
        throw Error("NO DIRECTION PASSED TO HERO")
    }
  
    if(this.props.bounceCount !== 0){
      this.bounce(this.props.direction)
    }
    
    return (
      <div className={cn + " tile"} ref={this.myRef}></div>
    );

  }
}


export default Hero;