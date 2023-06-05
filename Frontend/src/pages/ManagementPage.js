import CountryInformations from "../components/adminPage/management/CountryInformations";
import Gainers from "../components/adminPage/management/Gainers";
import HighestVolumes from "../components/adminPage/management/HighestVolumes";

import styles from "../styles/Management.module.css";

const ManagementPage = () => {
  return (
    <>
      <div className={styles.Tables}>
        <div className={styles.Tables12}>
          <HighestVolumes />
          <Gainers />
        </div>
        <CountryInformations />
      </div>
    </>
  );
};

export default ManagementPage;
