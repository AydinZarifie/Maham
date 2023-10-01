import { useState } from "react";
import styles from "../../../styles/watchlist.module.css";

import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import InformationModal from "../../../components/userPanel/InformationModal";

const Watchlist = () => {
  const { tutorial } = useOutletContext();

  const [classicTutorial, setClassicTutorial] = useState(false);
  const [chartTutorial, setChartTutorial] = useState(false);

  return (
    <>
      {classicTutorial && (
        <InformationModal text="" onClose={() => setClassicTutorial(false)} />
      )}
      {chartTutorial && (
        <InformationModal text="" onClose={() => setChartTutorial(false)} />
      )}
      <div className={styles.Row}>
        <div className={styles.LeftHeader}>
          <div className={styles.MenuButtonsDiv}>
            <div>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.tab : styles.tab2
                }
                to=""
                end
              >
                Chart
              </NavLink>
              {tutorial && (
                <div
                  className={styles.assetsInfo}
                  onClick={() => setChartTutorial(true)}
                >
                  ?
                </div>
              )}
            </div>
            <div>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.tab : styles.tab2
                }
                to="classic"
              >
                Classic
              </NavLink>
              {tutorial && (
                <div
                  className={styles.transactionInfo}
                  onClick={() => setClassicTutorial(true)}
                >
                  ?
                </div>
              )}
            </div>
          </div>
        </div>
        <Outlet context={{ tutorial }} />
      </div>
    </>
  );
};

export default Watchlist;
