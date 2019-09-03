import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Navigation() {
  const [drawerOpen, toggleDrawer] = useState();
  return (
    <>
      <Header />
      <Sidebar />
    </>
  );
}

export default Navigation;
