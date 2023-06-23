import data from "../../../dummyData/estateTableData";

import styles from "../../../styles/Management.module.css";
import EstateTableItem from "./EstateTableItem";

const EstateTable = () => {
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
              <th>Lock</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <EstateTableItem {...item} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EstateTable;