import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  nested: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(3)
  },
  nestedLarge: {
    paddingTop: theme.spacing(6),
    paddingLeft: theme.spacing(6)
  },
  sliderRoot: {
    maxWidth: 200
  }
}));

export default useStyles;
