import React, { useState } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggledHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  return (
    <>
      <Toolbar sideDrawerToggledHandler={sideDrawerToggledHandler} />
      <SideDrawer
        open={showSideDrawer}
        sideDrawerClosedHandler={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </>
  );
};

export default Layout;
