import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Navigation({ highestCost, allEffects, allElements }) {
  return (
    <>
      <Header />
      <Sidebar
        highestCost={highestCost}
        allEffects={allEffects}
        allElements={allElements}
      />
    </>
  );
}

export default Navigation;
