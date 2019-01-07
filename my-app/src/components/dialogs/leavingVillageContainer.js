import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {leavingVillageSelected} from '../../actions'

class LeavingVillageContainer extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      isVisible: false
    };
  }

  componentDidMount () {
    if (this.state.isVisible) {
        this.show();
    }
  }
  show () {
      this.state.isVisible = true;
      this.dialog.showModal();
  }
  hide () {
      this.state.isVisible = false;
      this.dialog.close();
  }
  componentWillReceiveProps (nextProps) {
      if (nextProps.visible !== this.state.isVisible) {
          this.state.isVisible = nextProps.visible;

          if (this.state.isVisible) {
              this.show();
          } else {
              this.hide();
          }
      }
  }
  render () {
      this.state.isVisible = this.props.visible;
      let self = this;
      return (
          <dialog className="dialog" ref={(ref) => this.dialog = ref}>
            <div> 
              <span>Hello World</span>
              <button onClick= {e => {console.log("clicked"); debugger; self.hide();e.preventDefault(); leavingVillageSelected(e) }} 
              id="leavingVillageClicked">Yes</button>
            </div>
          </dialog>
      );
  }

}

function mapStateToProps(state){
  return {
    visible: state.game.focus.exitingVillageDialog
  }
}

function mapDispatchToProps(dispatch){

  return {
    leavingVillageSelected: (target) => {
      dispatch(leavingVillageSelected(target))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeavingVillageContainer);