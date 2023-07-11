import data from "../../../dummyData/gainerData";

import gainerIcon from "../../../images/stockgraph-svgrepo-com.svg";
import orderIcon from "../../../images/SVGRepo_iconCarrier (1).svg";

import styles from "../../../styles/Management.module.css";

import GainerItem from "./GainerItem";

const Gainers = () => {
  return (
    <div className={styles.Tables2AndName}>
      <span className={styles.GainersSpan}>
        <img src={gainerIcon} className={styles.GainersIcon} />
        <h3>Gainers</h3>
      </span>
      <div className={styles.Gainers}>
        <table className={styles.styledTable}>
          <thead>
            <tr>
              <th>
                <img src={orderIcon} />
              </th>
              <th>Estate Name</th>
              <th>Price</th>
              <th>24h%</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <GainerItem key={item.id} {...item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Gainers;
