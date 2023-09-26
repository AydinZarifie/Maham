import { useState } from "react";
import styles from "../../styles/userPanel.module.css";

import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import InformationModal from "./InformationModal";

const ManagementAssets = () => {
  const { tutorial } = useOutletContext();
  const [assetsTutorial, setAssetsTutorial] = useState(false);
  const [transactionsTutorial, setTransactionsTutorial] = useState(false);

  return (
    <>
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
              {tutorial && (
                <div
                  className={styles.questionMarkCircle}
                  onClick={() => setAssetsTutorial(true)}
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
                to="transactions"
              >
                Transaction
              </NavLink>
              {tutorial && (
                <div
                  className={styles.questionMarkCircle}
                  onClick={() => setAssetsTutorial(true)}
                >
                  ?
                </div>
              )}
            </div>
          </div>
        </div>
        <Outlet />
      </div>
      {assetsTutorial && <InformationModal text="" onClose={()=>setAssetsTutorial(false)} />}
      {transactionsTutorial && <InformationModal text="" onClose={()=>setTransactionsTutorial(false)} />}
    </>
  );
};

export default ManagementAssets;
