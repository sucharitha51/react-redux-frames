import React from "react";
import "./styles.css";

import Frame from "../Frame/Frame";

const FrameList = ({ selected, selectFrame }) => {
  return (
    <>
      <div>Frames</div>
      <div className={"frame-selection-group-wrapper"}>
        <Frame
          index={0}
          name="FIRST"
          selectedIndex={selected}
          select={selectFrame}
        />
        <Frame
          index={1}
          name="MIDDLE"
          selectedIndex={selected}
          select={selectFrame}
        />
        <Frame
          index={2}
          name="MIDDLE"
          selectedIndex={selected}
          select={selectFrame}
        />
        <Frame
          index={3}
          name="LAST"
          selectedIndex={selected}
          select={selectFrame}
        />
      </div>
    </>
  );
};

export default FrameList;
