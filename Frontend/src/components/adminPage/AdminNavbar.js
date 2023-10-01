import styles from "../../styles/Admin.module.css";
import overlayStyle from "../../styles/overlay.module.css";

import { useRef, useState } from "react";

import logo from "../../images/Maham2.png";
import logOutIcon from "../../images/logout-svgrepo-com.svg";
import dashboardIcon from "../../images/dashboard-1-svgrepo-com.svg";
import settingIcon from "../../images/setting-svgrepo-com.svg";
import notificationIcon from "../../images/notification-svgrepo-com.svg";
import estateIcon from "../../images/real-estate-search-house-svgrepo-com.svg";
import chatIcon from "../../images/chat-line-square-svgrepo-com.svg";
import profileIcon from "../../images/user-svgrepo-com.svg";
import adminPanelIcon from "../../images/opencontacts-svgrepo-com.svg";

import AdminMenuItem from "./AdminMenuItem";
import { Form, Link } from "react-router-dom";
import {
  retrieveAndDecodeInCookies,
  retrieveAndDecodeInLocalStorage,
} from "../../util/auth";

export default function AdminNavbar() {
  const [overlay, setOverlay] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const Nav = useRef(null);

  function openNav() {
    Nav.current.style.width = "300px";
    setOverlay(true);
  }

  function closeNav() {
    Nav.current.style.width = "0px";
    setOverlay(false);
  }

  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      {overlay && (
        <div
          className={overlayStyle.overlaySidenavAdmin}
          onClick={closeNav}
        ></div>
      )}

      <div className={styles.column1}>
        <div className={styles.SideMenu}>
          <div ref={Nav} id="mySidenav" className={styles.sidenav}>
            <a className={styles.closebtn} onClick={closeNav}>
              &times;
            </a>
            <div className={styles.Logo2}>
              <div className={styles.LogoName2}>
                <h1 className={styles.h1Name2}>MAHAM</h1>
              </div>
            </div>

            {retrieveAndDecodeInCookies("type") === "superadmin" && (
              <AdminMenuItem
                link="/admin"
                imgSrc={dashboardIcon}
                text="Dashboard"
                onClick={closeNav}
                end={true}
              />
            )}

            <AdminMenuItem
              link="estates"
              imgSrc={estateIcon}
              text="Estate"
              onClick={closeNav}
            />
            {/* <AdminMenuItem
              link=""
              imgSrc={walletIcon}
              text="Wallet"
              onClick={closeNav}
            />
            <AdminMenuItem
              link=""
              imgSrc={transactionIcon}
              text="Transaction"
              onClick={closeNav}
            /> */}
            {retrieveAndDecodeInCookies("type") === "superadmin" && (
              <AdminMenuItem
                link="management"
                imgSrc={settingIcon}
                text="Management"
                onClick={closeNav}
              />
            )}

            {retrieveAndDecodeInCookies("type") === "superadmin" && (
              <AdminMenuItem
                link="admins"
                imgSrc={adminPanelIcon}
                text="Admins"
                onClick={closeNav}
              />
            )}
          </div>
          <span className={styles.OpenNav} onClick={openNav}>
            &#9776;
          </span>
        </div>
        <div className={styles.Logo}>
          <div className={styles.LogoImg}>
            <img src={logo} className={styles.LogoImage} />
          </div>
          <div className={styles.LogoName}>
            <h1 className={styles.h1Name}>MAHAM</h1>
          </div>
        </div>
      </div>
      <div className={styles.column2}>
        <div className={styles.Buttons}>
          <div className={styles.ChatBtn}>
            <button type="button" className={styles.ChatButton}>
              <img src={chatIcon} className={styles.ChatIcn} />
            </button>
          </div>
          <div className={styles.NotifBtn}>
            <button type="button" className={styles.iconButton}>
              {/* <span className="material-icons">notifications</span> */}
              <img
                width={35}
                height={35}
                src={notificationIcon}
                className={styles.materialIcons}
              />
              <span className={styles.iconButtonBadge}>1</span>
            </button>
          </div>
          <div className={styles.ProfileBtn}>
            <button type="button" className={styles.ProfileButton}>
              <img src={profileIcon} className={styles.ProfileIcn} />
            </button>
          </div>
        </div>
        <div className={styles.Names}>
          <div className={styles.AdminName}>
            <h3 className={styles.h3AdminName}>
              {retrieveAndDecodeInLocalStorage("firstname")}{" "}
              {retrieveAndDecodeInLocalStorage("lastname")}
            </h3>
          </div>
          <div className={styles.AdminInformations}>
            <h6 className={styles.h6AdminInformations}>
              {retrieveAndDecodeInCookies("type")}
            </h6>
          </div>
        </div>
        {/*  */}
        <div className={styles.dropdown}>
          <div className={styles.selectedOption} onClick={toggleDropdown}>
            <span></span>

            <span
              className={`${styles.arrow} ${dropdown ? `${styles.open}` : ""}`}
            >
              &#9660;
            </span>
          </div>
          {dropdown && (
            <>
              <div
                className={overlayStyle.overlayWithoutBlur}
                onClick={toggleDropdown}
              ></div>
              <ul className={styles.options}>
                <li>
                  <Link
                    to="/admin/profile"
                    style={{ width: "100%", textDecoration: "none" }}
                    onClick={toggleDropdown}
                  >
                    <button className={styles.PAndLBttons}>
                      <img src={profileIcon} />
                      Profile
                    </button>
                  </Link>
                </li>
                <li>
                  <Form
                    action="/admin/logout"
                    method="post"
                    style={{ width: "100%" }}
                  >
                    <button
                      className={styles.PAndLBttons}
                      style={{ color: "#ff2e2e" }}
                    >
                      <img src={logOutIcon} />
                      Log out
                    </button>
                  </Form>
                </li>
              </ul>
            </>
          )}
        </div>
        {/*  */}
      </div>
    </header>
  );
}
