import styles from "../../styles/userPanel.module.css";

import profileIcon from "../../images/profile-circle-black-svgrepo-com.svg";
import eyeIcon from "../../images/eye-svgrepo-com.svg";
import walletIcon from "../../images/wallet-black-svgrepo-com.svg";
import arrowIcon from "../../images/arrow-down-black-svgrepo-com.svg";
import reportIcon from "../../images/file-error-svgrepo-com.svg";
import { forwardRef, useRef } from "react";
import { Link } from "react-router-dom";

const Navigation = forwardRef(
  ({ navRef, navOverlayRef, closeNavHandler, tutorial, openProfile }, ref) => {
    const managementAssets = useRef();
    const reports = useRef();
    const arrow1 = useRef();
    const arrow2 = useRef();

    const toggleManagementAssets = () => {
      if (managementAssets.current.style.maxHeight == "85px") {
        managementAssets.current.style.maxHeight = "0px";
        arrow1.current.style.rotate = "0deg";
        // ManagementAssets.style.backgroundColor = "";
      } else {
        managementAssets.current.style.maxHeight = "85px";
        arrow1.current.style.rotate = "180deg";
        // ManagementAssets.style.backgroundColor = "#4141411a";
      }
    };

    const toggleReports = () => {
      if (reports.current.style.maxHeight == "85px") {
        reports.current.style.maxHeight = "0px";
        arrow2.current.style.rotate = "0deg";
        // Reports.style.backgroundColor = "";
      } else {
        reports.current.style.maxHeight = "85px";
        arrow2.current.style.rotate = "180deg";
        // Reports.style.backgroundColor = "#4141411a";
      }
    };

    return (
      <>
        <div className={styles.sideNav} ref={navRef}>
          <div className={styles.closeSideNav} onClick={closeNavHandler}>
            &times;
          </div>

          <div className={styles.LogoDiv}>
            <h1>MAHAM</h1>
          </div>
          <div className={styles.MenuItemDiv}>
            <div>
              <div className={styles.MenuItem} onClick={openProfile}>
                <div className={styles.InsideMenuItem}>
                  <img src={profileIcon} className={styles.MenuIcons} />
                  Profile
                </div>
              </div>

              {tutorial && (
                <div className={styles.questionMarkMenu}>
                  <p>?</p>
                </div>
              )}
            </div>

            <div>
              <Link
                className={styles.MenuItem}
                onClick={closeNavHandler}
                to="watchlist/classic"
              >
                <div className={styles.InsideMenuItem}>
                  <img src={eyeIcon} className={styles.MenuIcons} />
                  Watch lists
                </div>
              </Link>
              {tutorial && (
                <div className={styles.questionMarkMenu}>
                  <p>?</p>
                </div>
              )}
            </div>

            <div
              className={`${styles.MenuItem} ${styles.ManagementAssets}`}
              onClick={toggleManagementAssets}
            >
              <div className={styles.InsideMenuItem}>
                <img src={walletIcon} className={styles.MenuIcons} />
                Management Assets
              </div>

              <img
                src={arrowIcon}
                className={`${styles.arrowIcon} ${styles.Arrow1}`}
                ref={arrow1}
              />
            </div>
            <div className={styles.ManagementAssetsItem} ref={managementAssets}>
              <div className={styles.managementAssets2}>
                <Link
                  className={styles.ManagementAssetsItems}
                  onClick={closeNavHandler}
                  to=""
                >
                  - Assets
                </Link>
                {tutorial && (
                  <div className={styles.questionMarkMenuLittle}>
                    <p>?</p>
                  </div>
                )}
              </div>
              <div className={styles.managementAssets2}>
                <Link
                  className={styles.ManagementAssetsItems2}
                  onClick={closeNavHandler}
                  to="transactions"
                >
                  - Transaction
                </Link>
                {tutorial && (
                  <div className={styles.questionMarkMenuLittle}>
                    <p>?</p>
                  </div>
                )}
              </div>
            </div>

            <div
              className={`${styles.MenuItem} ${styles.Reports}`}
              onClick={toggleReports}
            >
              <div className={styles.InsideMenuItem}>
                <img src={reportIcon} className={styles.MenuIcons} />
                Reports
              </div>

              <img
                src={arrowIcon}
                className={`${styles.arrowIcon} ${styles.Arrow2}`}
                ref={arrow2}
              />
            </div>
            <div className={styles.ReportsItem} ref={reports}>
              <div className={styles.managementAssets2}>
                <Link
                  onClick={closeNavHandler}
                  to="reports"
                  className={styles.ReportsItems}
                >
                  - Lock Estate
                </Link>
                {tutorial && (
                  <div className={styles.questionMarkMenuLittle}>
                    <p>?</p>
                  </div>
                )}
              </div>
              <div className={styles.managementAssets2}>
                <Link
                  className={styles.ReportsItems2}
                  onClick={closeNavHandler}
                  to="reports/getdocument"
                >
                  - Get document
                </Link>
                {tutorial && (
                  <div className={styles.questionMarkMenuLittle}>
                    <p>?</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className={styles.sideNavOverlay}
          ref={navOverlayRef}
          onClick={closeNavHandler}
        ></div>
      </>
    );
  }
);

export default Navigation;
