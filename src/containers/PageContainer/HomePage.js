import React, { Component } from "react";
import FramePage from "../../components/FramePage/FramePage";
import Modal from "../../components/Modal/Modal";
import { connect } from "react-redux";

import {
  fetchFrames,
  selectFrame,
  copyFrame,
  resetError,
  fetchingFrames,
} from "../../actions/FrameActions";

class HomePage extends Component {
  componentDidMount() {
    this.props.fetchFrames();
  }

  render() {
    return (
      <div>
        <FramePage
          tableData={this.props.tableData}
          selected={this.props.selectedFrame}
          selectFrame={this.props.selectFrame}
          copiedFrame={this.props.copiedFrame}
          copyFrame={this.props.copyFrame}
        />
        <Modal
          isError={this.props.isFetchingFramesError}
          resetError={this.props.resetError}
          statusCode={this.props.statusCode}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.framesPage,
});

const mapDispatchToProps = {
  fetchFrames,
  selectFrame,
  copyFrame,
  resetError,
  fetchingFrames,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
