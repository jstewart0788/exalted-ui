import React, { useEffect, useState } from "react";
import _ from "lodash";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Charm from "./Charm";
import useStyles from "./styles";

import axios from "axios";
import Navigation from "./Navigation";
import theme from "./theme";

function App() {
  const [allIds, setallIds] = useState([]);
  const [byIds, setbyIds] = useState({});
  const highestCost = 10;
  const [allEffects, setAllEffects] = useState([]);
  const [allElements, setAllElements] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    async function fetchCharms() {
      // Fetch Claims from API
      const { data } = await axios.get(`/api/charms`);
      // Set Main Charm Structures
      const byIds = {};
      const allIds = data.map(charm => {
        byIds[charm.id] = charm;
        return charm.id;
      });
      setbyIds(byIds);
      setallIds(allIds);
    }
    fetchCharms();
  }, []);

  // Set Meta Values
  useEffect(() => {
    let temp = [];
    allIds.forEach(id => {
      temp = _.union(temp, byIds[id].effects);
    });
    setAllEffects(temp);
  }, [allIds, byIds]);

  useEffect(() => {
    let temp = [];
    allIds.forEach(id => {
      temp = _.union(temp, byIds[id].elements);
    });
    setAllElements(temp);
  }, [allIds, byIds]);

  console.log("byIds", byIds);
  console.log("allIds", allIds);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Navigation
          highestCost={highestCost}
          allEffects={allEffects}
          allElements={allElements}
        />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {allIds.map((charmId, index) => (
            <Charm
              charm={byIds[charmId]}
              index={index}
              key={`charm-${byIds[charmId].id}`}
            />
          ))}
        </main>
      </ThemeProvider>
    </div>
  );
}

export default App;
