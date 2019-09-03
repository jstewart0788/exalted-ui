import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CategoryTwoTone from "@material-ui/icons/CategoryTwoTone";
import MonetizationOnTwoTone from "@material-ui/icons/MonetizationOnTwoTone";
import Brightness6TwoTone from "@material-ui/icons/Brightness6TwoTone";
import LockTwoTone from "@material-ui/icons/LockTwoTone";
import GamepadTwoTone from "@material-ui/icons/GamepadTwoTone";
import { NAV_ITEMS } from "../../shared/constants";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar
}));

const renderIcon = name => {
  switch (name) {
    case NAV_ITEMS.COSTS:
      return <MonetizationOnTwoTone />;
    case NAV_ITEMS.EFFECTS:
      return <CategoryTwoTone />;
    case NAV_ITEMS.ELEMENTS:
      return <Brightness6TwoTone />;
    case NAV_ITEMS.MINIMUMS:
      return <LockTwoTone />;
    default:
      return <GamepadTwoTone />;
  }
};

export default function Sidebar() {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.toolbar} />
      <List>
        {Object.values(NAV_ITEMS).map(text => (
          <ListItem button key={text}>
            <ListItemIcon>{renderIcon(text)}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
