import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle sideDrawerToggledHandler={props.sideDrawerToggledHandler}/>
            <div className={classes.Logo}>
            <Logo/>
            </div>
            <nav className={classes.DesktopView}>
                <NavigationItems/>
            </nav>
            
        </header>
    )
}

export default Toolbar
