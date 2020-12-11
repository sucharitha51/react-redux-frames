import React from "react";
import classNames from "classnames";
import "./styles.css";

const Frame = ({ index, selectedIndex, select, name }) => {
  const className = classNames({
    "frame-selection-wrapper": true,
    "frame-selection-wrapper--selected": index === selectedIndex,
  });
  return (
    <div style={{ margin: "10px", fontSize: "12px" }}>
      <div>{name}</div>
      <div className={className} onClick={() => select(index)}></div>
    </div>
  );
};

export default Frame;
