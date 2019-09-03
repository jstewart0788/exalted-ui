import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import Navigation from "./Navigation";
import theme from "./theme";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar,
  paper: {
    padding: 20
  }
}));

function App() {
  const [charms, setCharms] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    async function fetchCharms() {
      const { data } = await axios.get(`/api/charms`);
      setCharms(data);
    }
    fetchCharms();
  }, []);

  console.log(charms);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Navigation />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {charms.map(charm => (
            <Paper key={`charm-${charm.id}`} className={classes.paper}>
              {charm.name}
            </Paper>
          ))}
        </main>
      </ThemeProvider>
    </div>
  );
}

export default App;
