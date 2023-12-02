import styles from "../styles/GuidePage.module.css";

import blackHomeIcon from "../images/home-smile-angle-svgrepo-com.svg";
import redHomeIcon from "../images/home-smile-angle-svgrepo-redcom.svg";
import loginIcon from "../images/log-in-02-svgrepo-com.svg";
import arrowDownIcon from "../images/arrow-down-svgrepo-com.svg";
import verifiedIcon from "../images/diploma-verified-svgrepo-com.svg";
import panelSectionIcon from "../images/panel-sectioned-svgrepo-com.svg";
import blackWalletIcon from "../images/wallet-black2-svgrepo-com.svg";
import fileErrorIcon from "../images/file-error-black-svgrepo-com.svg";
import Menu from "../components/general/Menu";
import { Outlet } from "react-router-dom";
import { useRef } from "react";

const GuidePage = () => {
  const signupAndLoginRef=useRef();
  const verificationRef=useRef();
  const userPanelRef=useRef();
  const managementAssetsRef=useRef();
  const reportsRef=useRef();

  const LeftLine2=useRef();
  const OptionH42=useRef();
  const MenuOption3=useRef();

  const LeftLine3=useRef();
  const OptionH43=useRef();
  const MenuOption4=useRef();

  const LeftLine4=useRef();
  const OptionH44=useRef();
  const MenuOption6=useRef();

  const LeftLine5=useRef();
  const OptionH45=useRef();
  const MenuOption7=useRef();

  const LeftLine6=useRef();
  const OptionH46=useRef();
  const MenuOption8=useRef();

  const LeftLine7=useRef();
  const OptionH47=useRef();
  const MenuOption9=useRef();

  const LeftLine8=useRef();
  const OptionH48=useRef();
  const MenuOption11=useRef();

  const toggleSignupAndLogin=()=>{

  }

  const toggleVerification=()=>{

  }

  const toggleUserPanel=()=>{

  }

  const toggleManagementAssets=()=>{

  }

  const toggleReports=()=>{

  }

  return (
    <>
      <Menu />
      <div className={styles.SideMenu}>
        <div className={styles.OCDiv}>
          <div className={styles.OpenDiv} onClick="openMenu()">
            &#9776;
          </div>
          <div className={styles.CloseDiv} onClick="closeMenu()">
            &times;
          </div>
        </div>
        <div className={styles.MenuOption} onClick="ClickOption()">
          <span>
            <div className={styles.LeftLine}></div>
            <img src={blackHomeIcon} className={styles.MenuIcon} />
            <img src={redHomeIcon} className={styles.MenuIcon} />
            <h4 className={styles.OptionH41}>Home page</h4>
          </span>
        </div>
        <div className={styles.MenuOption} onClick="OpenOption()">
          <span>
            <div className={styles.LeftLine}></div>
            <img src={loginIcon} className={styles.MenuIcon} />
            <h4>SignUp&LogIn</h4>
          </span>
          <img src={arrowDownIcon} className={styles.arrowIcon} />
        </div>
        <div className={styles.InsideOption}>
          <div className={styles.MenuOption} onClick="ClickOption2()">
            <span>
              <div className={styles.LeftLine}></div>

              <h4 className={styles.OptionH42}>- SignUP</h4>
            </span>
          </div>
          <div className={styles.MenuOption} onClick="ClickOption3()">
            <span>
              <div className={styles.LeftLine}></div>

              <h4 className={styles.OptionH43}>- LogIn</h4>
            </span>
          </div>
        </div>
        <div className={styles.MenuOption} onClick="OpenOption2()">
          <span>
            <div className={styles.LeftLine}></div>
            <img src={verifiedIcon} className={styles.MenuIcon} />
            <h4>Verification</h4>
          </span>
          <img src={arrowDownIcon} className={styles.arrowIcon} />
        </div>
        <div className={styles.InsideOption2}>
          <div className={styles.MenuOption} onClick="ClickOption4()">
            <span>
              <div className={styles.LeftLine}></div>

              <h4 className={styles.OptionH44}>- step 1</h4>
            </span>
          </div>
          <div className={styles.MenuOption} onClick="ClickOption5()">
            <span>
              <div className={styles.LeftLine}></div>

              <h4 className={styles.OptionH45}>- step 2</h4>
            </span>
          </div>
          <div className={styles.MenuOption} onClick="ClickOption6()">
            <span>
              <div className={styles.LeftLine}></div>

              <h4 className={styles.OptionH46}>- step 3</h4>
            </span>
          </div>
          <div className={styles.MenuOption} onClick="ClickOption7()">
            <span>
              <div className={styles.LeftLine}></div>

              <h4 className={styles.OptionH47}>- step 4</h4>
            </span>
          </div>
        </div>

        <div className={styles.MenuOption} onClick="OpenOption3()">
          <span>
            <div className={styles.LeftLine}></div>
            <img src={panelSectionIcon} className={styles.MenuIcon} />
            <h4>User panel</h4>
          </span>
          <img src={arrowDownIcon} className={styles.arrowIcon} />
        </div>
        <div className={styles.InsideOption3}>
          <div className={styles.MenuOption} onClick="ClickOption8()">
            <span>
              <div className={styles.LeftLine}></div>

              <h4 className={styles.OptionH48}>- Profile</h4>
            </span>
          </div>
          <div className={styles.MenuOption} onClick="ClickOption9()">
            <span>
              <div className={styles.LeftLine}></div>

              <h4 className={styles.OptionH49}>- Wathlist</h4>
            </span>
          </div>
          <div className={styles.MenuOption} onClick="ClickOption10()">
            <span>
              <div className={styles.LeftLine}></div>

              <h4 className={styles.OptionH410}>- Favourites</h4>
            </span>
          </div>
          <div className={styles.MenuOption} onClick="OpenOption4()">
            <span>
              <div className={styles.LeftLine}></div>
              <img src={blackWalletIcon} className={styles.MenuIcon} />
              <h4>Managment Assets</h4>
            </span>
            <img src={arrowDownIcon} className={styles.arrowIcon} />
          </div>

          <div className={styles.InsideOption4}>
            <div className={styles.MenuOption} onClick="ClickOption11()">
              <span>
                <div className={styles.LeftLine}></div>

                <h4 className={styles.OptionH411}>- Assets</h4>
              </span>
            </div>
            <div className={styles.MenuOption} onClick="ClickOption12()">
              <span>
                <div className={styles.LeftLine}></div>

                <h4 className={styles.OptionH412}>- Transaction</h4>
              </span>
            </div>
          </div>

          <div className={styles.MenuOption} onClick="OpenOption5()">
            <span>
              <div className={styles.LeftLine}></div>
              <img src={fileErrorIcon} className={styles.MenuIcon} />
              <h4>Reports</h4>
            </span>
            <img src={arrowDownIcon} className={styles.arrowIcon} />
          </div>
          <div className={styles.InsideOption5}>
            <div className={styles.MenuOption} onClick="ClickOption13()">
              <span>
                <div className={styles.LeftLine}></div>

                <h4 className={styles.OptionH413}>- Get document</h4>
              </span>
            </div>
            <div className={styles.MenuOption} onClick="ClickOption14()">
              <span>
                <div className={styles.LeftLine}></div>

                <h4 className={styles.OptionH414}>- Document status</h4>
              </span>
            </div>
          </div>
        </div>
      </div>

     <Outlet />
    </>
  );
};

export default GuidePage;
