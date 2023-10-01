import { useState } from "react";
import styles from "../../../styles/reports.module.css";

import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import InformationModal from "../../../components/userPanel/InformationModal";

const Reports = () => {
  const { tutorial } = useOutletContext();

  const [getDocumentTutorial, setGetDocumentTutorial] = useState(false);
  const [documentStatusTutorial, setDocumentStatusTutorial] = useState(false);

  return (
    <>
      {getDocumentTutorial && (
        <InformationModal
          text=""
          onClose={() => setGetDocumentTutorial(false)}
        />
      )}
      {documentStatusTutorial && (
        <InformationModal
          text=""
          onClose={() => setDocumentStatusTutorial(false)}
        />
      )}
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
              {tutorial && (
                <div
                  className={styles.questionMarkCircle}
                  onClick={() => setGetDocumentTutorial(true)}
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
                to="documentstatus"
              >
                Document status
              </NavLink>
              {tutorial && (
                <div
                  className={styles.questionMarkCircle}
                  onClick={() => setDocumentStatusTutorial(true)}
                >
                  ?
                </div>
              )}
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Reports;
