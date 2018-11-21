import React, { Component } from 'react';
import GameMap from './GameMap.js'

class Game extends Component {
  constructor(props){
    super(props);
    this.state = { 
      game: {
        map: [
          [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
          [1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1],
          [0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
          [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
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

  canMove(xdelta,ydelta){
    let {x,y} = this.state.game.hero.location;
    let tile = this.state.game.map[y+ydelta][x+xdelta];

    return GameMap.translateTile(tile).navigable === "true";
  } 

  updateHeroPosition(xdelta, ydelta){
    let result = this.canMove(xdelta, ydelta);

    if(!result) {
      console.log("here");
      return;
    }

    let l = { 
        x: this.state.game.hero.location.x + xdelta, 
        y: this.state.game.hero.location.y + ydelta}
    this.setState({ 
      game: {
        map: [
          [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
          [1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1],
          [0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
          [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
          ],
        hero: {
          location: l
        }
      }})
  }

  handleButtonPress(e){
    console.log("THERE IS THE EVENT", this, e)
  }

  render() {
    return (
      <div onKeyDown={this.handleButtonPress}> here is Game 
        <GameMap game={this.state.game}></GameMap>
      </div>
    );
  }

}

export default Game;