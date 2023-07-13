import styles from "../../styles/homePage.module.css";

import serachIcon from "../../images/search-svgrepo-com.svg";
import filterIcon from "../../images/filter-alt-2-svgrepo-com (4).svg";

import Filters from "../filter/Filters";

const Preferences = (props) => {
  return (
    <>
      <div className={styles.row3}>
        <Filters admin={false} />
        <div className={styles.FilterandSearch}>
          <div>
            <button
              onClick={props.clickHandlerForFilterShown}
              className={styles.FilterandSearchBtn}
              role="button"
            >
              <img src={filterIcon} className={styles.FilterAndSearchIcn} />
            </button>
          </div>

          <div>
            <button
              onClick={props.clickHandlerForSearchShown}
              className={styles.FilterandSearchBtn}
              role="button"
            >
              <img src={serachIcon} className={styles.FilterAndSearchIcn} />
            </button>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};
export default Preferences;
