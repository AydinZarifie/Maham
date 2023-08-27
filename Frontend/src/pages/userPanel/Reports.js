import styles from "../../styles/reports.module.css";

import { NavLink, Outlet } from "react-router-dom";

const Reports = () => {
  return (
    <div className={styles.TableMainDiv}>
      <div className={styles.MenuDiv}>
        <div className={styles.MenuButtonsDiv}>
          <div>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.tab : styles.tab2
              }
              to=""
              end
            >
              Assets
            </NavLink>
            {/* {tutorial && <div className={styles.questionMarkCircle}>?</div>} */}
          </div>
          <div>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.tab : styles.tab2
              }
              to="getdocument"
            >
              Transaction
            </NavLink>
            {/* {tutorial && <div className={styles.questionMarkCircle}>?</div>} */}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Reports;
