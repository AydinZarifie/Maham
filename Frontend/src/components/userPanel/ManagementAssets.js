import styles from "../../styles/userPanel.module.css";

import { NavLink, Outlet, useOutletContext } from "react-router-dom";

const ManagementAssets = () => {
  const { tutorial } = useOutletContext();

  return (
    <>
      <div className={styles.TableMainDiv}>
        <div className={styles.MenuDiv}>
          <div className={styles.MenuButtonsDiv}>
            <div>
              <NavLink
                // className={`${styles.tab} ${styles.AssetsBtn}`}
                // onClick="ToggleClass1()"
                className={({ isActive }) =>
                  isActive ? styles.tab : styles.tab2
                }
                to=""
                end
              >
                Assets
              </NavLink>
              {tutorial && <div className={styles.questionMarkCircle}>?</div>}
            </div>
            <div>
              <NavLink
                // className={`${styles.tab2} ${styles.TransactionBtn}`}
                // onClick="ToggleClass2()"
                className={({ isActive }) =>
                  isActive ? styles.tab : styles.tab2
                }
                to="transactions"
              >
                Transaction
              </NavLink>
              {tutorial && <div className={styles.questionMarkCircle}>?</div>}
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default ManagementAssets;
