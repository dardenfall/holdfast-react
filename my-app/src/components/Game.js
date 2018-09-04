import React, { Component } from 'react';
import Map from './Map.js'

class Game extends Component {
  constructor(props){
    super(props);
    this.state = { 
      game: {
        map: [
          [{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"}],
          [{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"none"},{tile:"none"},{tile:"none"},{tile:"none"},{tile:"none"},{tile:"none"}],
          [{tile:"none"},{tile:"none"},{tile:"none"},{tile:"none"},{tile:"none"},{tile:"none"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"}],
          [{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"}]
        ],
        hero: {
          location: {
            x:0,
            y:2
          }
        }
      }
    }

    this.setUpButtonHandler();
  }

  setUpButtonHandler(){
    window.addEventListener('keydown',(e) => {
      switch (e.which) {
        case 37:
          this.moveLeft();
          break;
        case 65:
          this.moveLeft();
          break;
        case 38:
          this.moveUp();
          break;
        case 87:
          this.moveUp();
          break;
        case 39:
          this.moveRight();
          break;
        case 68:
          this.moveRight();
          break;
        case 40:
          this.moveDown();
          break;
        case 83:
          this.moveDown();
          break;
      }      
    })
  }

  moveDown(){
    this.updateHeroPosition(0,1)
  }
  moveUp(){
    this.updateHeroPosition(0,-1)
  }
  moveLeft(){
    this.updateHeroPosition(-1,0)
  }
  moveRight(){
    this.updateHeroPosition(1,0)
  }

  updateHeroPosition(xdelta, ydelta){
    console.log("old x", this.state.game.hero.location.x)
    console.log("old y", this.state.game.hero.location.y)
    this.state.game.hero.location.x += xdelta; 
    this.state.game.hero.location.y += ydelta; 
    console.log("new x", this.state.game.hero.location.x)
    console.log("new y", this.state.game.hero.location.y)
  }

  handleButtonPress(e){
    console.log("THERE IS THE EVENT", this, e)
  }

  render() {
    return (
      <div onKeyDown={this.handleButtonPress}> here is Game 
        <Map game={this.state.game}></Map>
      </div>
    );
  }

}

export default Game;