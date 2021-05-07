import React from "react";
import classes from "./Spinner.module.css";
const Spinner = () => {
  return (
    // <div className={classes.Loader}>Loading...</div>
    <div style={{ margin: "10% 44%" }}>
      <div className={classes.Loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
