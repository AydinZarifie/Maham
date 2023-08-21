import styles from "../styles/userPanel.module.css";

import Navigation from "../components/userPanel/Navigation";
import Header from "../components/userPanel/Header";
import { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Profile from "./userPanel/profile/Profile";

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
    profile.current.style.width = "0px";
  }

  const profile = useRef();

  function OpenProfile() {
    profile.current.style.width = "300px";
    nav.current.style.width = "0px";
  }

  function CloseProfile() {
    profile.current.style.width = "0px";
    navOverlay.current.style.display = "none";
  }

  return (
    <>
      <div className={styles.Main}>
        <Navigation
          navRef={nav}
          navOverlayRef={navOverlay}
          closeNavHandler={closeNav}
          tutorial={tutorial}
          openProfile={OpenProfile}
        />
        <Header openNavHandler={openNav} toggleTutorial={toggleTutorial} />
        <Outlet context={{ tutorial }} />
      </div>
      <Profile ref={profile} closeHandler={CloseProfile} />
    </>
  );
};

export default UserPanel;
