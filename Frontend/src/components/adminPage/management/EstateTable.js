import styles from "../../../styles/Management.module.css";

import lockIcon from "../../../images/SVGRepo_iconCarrier (3).svg";
import unlockIcon from "../../../images/unlock-svgrepo-com.svg";

import EstateTableItem from "./EstateTableItem";

const EstateTable = (props) => {
  return (
    <>
      <div className={styles.EstateInfo}>
        <table className={styles.styledTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>24h%</th>
              <th>7d%</th>
              <th>Volume</th>
              <th>Contract-Address</th>
              <th>Landlor-Address</th>
              <th>Sell-Position</th>
              <th>Lock-Position</th>
              <th>Lock</th>
            </tr>
          </thead>
          <tbody>
            {props.estates.map((item) => (
              <EstateTableItem {...item} lockEstate={props.lockEstate} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EstateTable;
