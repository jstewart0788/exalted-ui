import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  requirements: {
    marginLeft: 8
  },
  requirementTitle: {
    fontWeight: "bold"
  },
  charmBody: {
    maxWidth: 800
  },
  gold: {
    color: theme.palette.secondary.main
  },
  red: {
    color: "#ac3f21"
  }
}));

export default useStyles;
