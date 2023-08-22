import styles from "../../../styles/Management.module.css";

// import data from "../../../dummyData/countryInformationData";

import globeIcon from "../../../images/earth-svgrepo-com (1) 1.svg";
import flagIcon from "../../../images/emoji-flags-svgrepo-com 2.svg";

import CountryInformationItem from "./CountryInformationItem";

const CountryInformations = (props) => {
  return (
    <div className={styles.Tables3AndName}>
      <span className={styles.CountryInformationSpan}>
        <img src={globeIcon} className={styles.Icons} />
        <h3>Country Informations</h3>
      </span>

      <div className={styles.CountryInformation}>
        <table className={styles.styledTable}>
          <thead>
            <tr>
              <th>
                <img src={flagIcon} />
              </th>
              <th>Country-Name</th>
              <th>Number Of Estate</th>
              <th>Volume Trades</th>
            </tr>
          </thead>
          <tbody>
            {props.data.length>0 && props.data.map((item) => (
              <CountryInformationItem key={item.id} {...item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CountryInformations;
