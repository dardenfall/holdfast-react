import React from 'react';
import {connect} from 'react-redux';
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
  handleClick(e) {
    e.preventDefault(); 
    let proceed = e.target.id === "leavingVillageClickedProceed"; 
    this.props.leavingVillageSelected(proceed);
  }
  render () {
    this.state.isVisible = this.props.visible;
    return (
        <dialog className="dialog" ref={(ref) => this.dialog = ref}>
          <div> 
            <div>Are you sure you want to leave the village?</div>
            <button onClick={this.handleClick.bind(this)} 
            id="leavingVillageClickedProceed">Yes</button>            
            <button onClick={this.handleClick.bind(this)} 
            id="leavingVillageClickedDonotProceed">No</button>
          </div>
        </dialog>
    )
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