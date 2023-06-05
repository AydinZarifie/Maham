import data from "../../../dummyData/highestVolumeData";

import HighestVolumeItem from "./HighestVolumeItem";

import styles from "../../../styles/Management.module.css";

import volumeIcon from "../../../images/SVGRepo_iconCarrier.svg";
import orderIcon from "../../../images/SVGRepo_iconCarrier (1).svg";

const HighestVolumes = () => {
  return (
    <div className={styles.Tables1AndName}>
      <span className={styles.HighestVolumsSpan}>
        <img src={volumeIcon} />
        <h3 className={styles.TablesH3}>Highest Volums</h3>
      </span>
      <div className={styles.HighestVolums}>
        <table className={styles.styledTable}>
          <thead>
            <tr>
              <th>
                <img src={orderIcon} />
              </th>
              <th>Estate Name</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <HighestVolumeItem {...item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HighestVolumes;
