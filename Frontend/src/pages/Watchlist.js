import styles from "../styles/watchlist.module.css";

import { NavLink, Outlet, useOutletContext } from "react-router-dom";

const Watchlist = () => {
  const { tutorial } = useOutletContext();
  return (
    <div className={styles.Row}>
      <div className={styles.LeftHeader}>
        <div className={styles.MenuButtonsDiv}>
          <div>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.tab : styles.tab2
              }
              to="chart"
              // end
              
            >
              Chart
            </NavLink>
            {tutorial && <div className={styles.assetsInfo}>?</div>}
          </div>
          <div>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.tab : styles.tab2
              }
              to=""
              end
            >
              Classic
            </NavLink>
            {tutorial && (  <div className={styles.transactionInfo}>?</div>)}
          
          </div>
        </div>
      </div>
      <Outlet context={{tutorial}} />
    </div>
  );
};

export default Watchlist;
