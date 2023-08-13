import styles from "../styles/userPanel.module.css";

import Navigation from "../components/userPanel/Navigation";
import Header from "../components/userPanel/Header";
import { useRef, useState } from "react";
import { Outlet } from "react-router-dom";

const UserPanel = () => {
  const [tutorial, setTutorial] = useState(false);
  const nav = useRef(null);
  const navOverlay = useRef(null);

  const toggleTutorial = () => {
    setTutorial((prev) => !prev);
  };

  function openNav() {
    nav.current.style.width = "300px";
    navOverlay.current.style.display = "block";
  }
  function closeNav() {
    nav.current.style.width = "0px";
    navOverlay.current.style.display = "none";
  }

  return (
    <div className={styles.Main}>
      <Navigation
        navRef={nav}
        navOverlayRef={navOverlay}
        closeNavHandler={closeNav}
        tutorial={tutorial}
      />
      <Header openNavHandler={openNav} toggleTutorial={toggleTutorial} />
      <Outlet context={{ tutorial }} />
    </div>
  );
};

export default UserPanel;
