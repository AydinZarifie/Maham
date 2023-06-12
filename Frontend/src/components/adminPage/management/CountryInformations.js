import styles from "../../../styles/Management.module.css";

import globeIcon from "../../../images/earth-svgrepo-com (1) 1.svg";
import flagIcon from "../../../images/emoji-flags-svgrepo-com 2.svg";

import data from "../../../dummyData/countryInformationData";

import CountryInformationItem from "./CountryInformationItem";

const CountryInformations = (props) => {
  return (
    <div className={styles.Tables3AndName}>
      <span className={styles.CountryInformationSpan}>
        <img src={globeIcon} className={styles.Icons} />
        <h3>Country Informations</h3>
      </span>
      <div className={styles.Tables3}>
        <div className={styles.CountryInformation}>
          <table className={styles.styledTable}>
            <thead>
              <tr>
                <th>
                  <img src={flagIcon} />
                </th>
                <th>Country-Name</th>
                <th>Number Of State</th>
                <th>Volume Trades</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <CountryInformationItem {...item} />
              ))}
            </tbody>
          </table>
        </div>
        <button type="button" className={styles.AddButton} onClick={props.buttonHandler}>
          Add
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default CountryInformations;
