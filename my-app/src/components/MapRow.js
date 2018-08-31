import React, { Component } from 'react';
import Tree from './tiles/Tree.js'

class MapRow extends Component {
  constructor(props) {
    super(props)
    this.state = { 
       checking:false
    };

  }

  render() {
    return (
      <div className="map-row">
        {
          this.props.row.map(
            (t) => {
              let mapTags = [];
              console.log(t)
              switch (t.tile){
                case 'tree':
                  console.log(t.tile);
                  mapTags.push(<Tree></Tree>);
                  break;
                default: 
                  mapTags.push(<div className="empty-ground"></div>);
              }
              return mapTags;              
            }
          )
        }
      </div>
    );
  }
}

export default MapRow;