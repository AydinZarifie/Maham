import AdminMenuItem from "./AdminMenuItem";
import styles from "../../styles/Admin.module.css";
import logo from "../../images/Maham.png";
import { useRef } from "react";
import dashboardIcon from "../../images/dashboard-1-svgrepo-com.svg";
import walletIcon from "../../images/wallet-svgrepo-com.svg";
import transactionIcon from "../../images/transaction-svgrepo-com (1).svg";
import settingIcon from "../../images/setting-svgrepo-com.svg";
import notificationIcon from "../../images/notification-svgrepo-com.svg";
import estateIcon from "../../images/real-estate-search-house-svgrepo-com.svg";
import chatIcon from "../../images/chat-line-square-svgrepo-com.svg";
import profileIcon from "../../images/profile-circle-svgrepo-com.svg";

export default function AdminNavbar() {
  const Nav = useRef(null);

  function openNav() {
    Nav.current.style.width = "300px";
  }

  function closeNav() {
    Nav.current.style.width = "0px";
  }
  return (
    <header className={styles.header}>
      <div className={styles.Container}>
        <div className={styles.column1}>
          <div className={styles.SideMenu}>
            <div ref={Nav} id="mySidenav" className={styles.sidenav}>
              <a className={styles.closebtn} onClick={closeNav}>
                &times;
              </a>
              <div className={styles.Logo2}>
                <div className={styles.LogoImg2}>
                  <img src={logo} className={styles.LogoImage2} />
                </div>
                <div className={styles.LogoName2}>
                  <h1 className={styles.h1Name2}>MAHAM</h1>
                </div>
              </div>

              <AdminMenuItem
                link="/admin"
                imgSrc={dashboardIcon}
                text="Dashboard"
              />
              <AdminMenuItem link="estates" imgSrc={estateIcon} text="Estate" />
              <AdminMenuItem link="" imgSrc={walletIcon} text="Wallet" />
              <AdminMenuItem
                link=""
                imgSrc={transactionIcon}
                text="Transaction"
              />
              <AdminMenuItem
                link=""
                imgSrc={settingIcon}
                text="GeneralSetting"
              />
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
              <h3 className={styles.h3AdminName}>Mahdi Mehraz</h3>
            </div>
            <div className={styles.AdminInformations}>
              <h6 className={styles.h6AdminInformations}>SuperViser</h6>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
