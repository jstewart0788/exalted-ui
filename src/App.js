import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [charms, setCharms] = useState({});

  useEffect(() => {
    async function fetchCharms() {
      const { data } = await axios.get(
        `${process.env.BASE_ROUTE ? process.env.BASE_ROUTE : ""}/charms`
      );
      setCharms(data);
    }
    fetchCharms();
  }, []);

  return <div>{JSON.stringify(charms, null, 1)}</div>;
}

export default App;
