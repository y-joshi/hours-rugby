import React from "react";
import { Fragment } from "react";
import { connect } from 'react-redux'
function Timer(props) {
  return (
    <Fragment>
      <span className="digits">
        {("0" + Math.floor((props.time / 3600000) % 60)).slice(-2)}:
			</span>
      <span className="digits">
        {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
			</span>
      <span className="digits">
        {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}
      </span>
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    time: state.timer.time
  }
}

export default connect(
  mapStateToProps
)(Timer)

