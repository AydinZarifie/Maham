import styles from "../styles/GuidePage.module.css";

import blackHomeIcon from "../images/home-smile-angle-svgrepo-com.svg";
import redHomeIcon from "../images/home-smile-angle-svgrepo-redcom.svg";
import loginIcon from "../images/log-in-02-svgrepo-com.svg";
import verifiedIcon from "../images/diploma-verified-svgrepo-com.svg";
import panelSectionIcon from "../images/panel-sectioned-svgrepo-com.svg";
import blackWalletIcon from "../images/wallet-black2-svgrepo-com.svg";
import fileErrorIcon from "../images/file-error-black-svgrepo-com.svg";
import Menu from "../components/general/Menu";
import { Outlet } from "react-router-dom";
import { useRef } from "react";
import MenuOption from "../components/guidePage/MenuOption";

const GuidePage = () => {
  const SideMenuRef = useRef();
  const OpenDivRef = useRef();

  const toggleMenu = () => {
    if (SideMenuRef.current.style.width != "240px") {
      SideMenuRef.current.style.width = "240px";
      OpenDivRef.current.style.display = "none";
    } else {
      SideMenuRef.current.style.width = "42px";
      OpenDivRef.current.style.display = "block";  
      signUpAndLogInRef.current.closeMenu();
      verificationRef.current.closeMenu();
      userPanelRef.current.closeMenu(); 
    }
  };

  const signUpAndLogInRef=useRef();
  const verificationRef=useRef();
  const userPanelRef=useRef();

  return (
    <>
      <Menu scrolledDown={true} />
      <div className={styles.SideMenu} ref={SideMenuRef} id="SideMenuId">
        <div className={styles.OCDiv}>
          <div className={styles.OpenDiv} onClick={toggleMenu} ref={OpenDivRef}>
            &#9776;
          </div>
          <div className={styles.CloseDiv} onClick={toggleMenu}>
            &times;
          </div>
        </div>
        <div className={styles.MenuOption}>
          <span>
            <div className={styles.LeftLine}></div>
            <img src={blackHomeIcon} className={styles.MenuIcon} />
            {/* <img src={redHomeIcon} className={styles.MenuIcon} /> */}
            <h4 className={styles.OptionH41}>Home page</h4>
          </span>
        </div>
        <MenuOption
          name="SignUp&LogIn"
          img={loginIcon}
          children={["SignUP", "LogIn"]}
          size="80"
          ref={signUpAndLogInRef}
        />
        <MenuOption
          name="Verification"
          img={verifiedIcon}
          children={["step 1", "step 2", "step 3", "step 4"]}
          size="160"
          ref={verificationRef}
        />
        <MenuOption
          name="User panel"
          img={panelSectionIcon}
          children={["Profile", "Wathlist", "Favourites"]}
          size="360"
          ref={userPanelRef}
          mainChildren={[
            {
              name: "Managment Assets",
              img: blackWalletIcon,
              children: ["Assets", "Transaction"],
              size: "80",
            },
            {
              name: "Reports",
              img: fileErrorIcon,
              children: ["Get document", "Document status"],
              size: "80",
            },
          ]}
        />
      </div>
      <Outlet />
    </>
  );
};

export default GuidePage;
