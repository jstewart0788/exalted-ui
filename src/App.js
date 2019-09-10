import React, { useEffect } from "react";
import axios from "axios";
import Charm from "./Charm";
import Navigation from "./Navigation";
import { useCharm } from "./shared/CharmContext";
import { CHARM_ACTIONS } from "./shared/constants";
import useStyles from "./styles";

function App() {
  const classes = useStyles();
  const [state, dispatch] = useCharm();
  const {
    charms: { byIds },
    visibleCharms
  } = state;

  useEffect(() => {
    async function fetchCharms() {
      // Fetch Claims from API
      const { data } = await axios.get(`/api/charms`);
      // Set Main Charm Structures
      dispatch({ type: CHARM_ACTIONS.UPDATE_CHARMS, payload: data });
    }
    fetchCharms();
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Navigation />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {visibleCharms.map((charmId, index) => (
          <Charm
            charm={byIds[charmId]}
            index={index}
            key={`charm-${byIds[charmId].id}`}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
