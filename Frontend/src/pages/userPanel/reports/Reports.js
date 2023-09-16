import styles from "../../../styles/reports.module.css";

import { NavLink, Outlet, useOutletContext } from "react-router-dom";

const Reports = () => {
  const { tutorial } = useOutletContext();
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
              Get document
            </NavLink>
            {tutorial && <div className={styles.questionMarkCircle}>?</div>}
          </div>
          <div>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.tab : styles.tab2
              }
              to="documentstatus"
            >
              Document status
            </NavLink>
            {tutorial && <div className={styles.questionMarkCircle}>?</div>}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Reports;
