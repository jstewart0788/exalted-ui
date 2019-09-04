import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Charm from "./Charm";
import useStyles from "./styles";

import axios from "axios";
import Navigation from "./Navigation";
import theme from "./theme";

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
          {charms.map((charm, index) => (
            <Charm charm={charm} index={index} key={`charm-${charm.id}`} />
          ))}
        </main>
      </ThemeProvider>
    </div>
  );
}

export default App;
