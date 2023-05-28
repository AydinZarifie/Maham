import styles from "../../styles/Details.module.css"

import chartIcon from "../../images/bar-chart-svgrepo-com.svg"
import saveIcon  from "../../images/save-add-svgrepo-com.svg"
import shareIcon from "../../images/share-1-svgrepo-com.svg"

const Headline = () => {
  return (
    <div className={styles.Row1}>
      <div>
        <div>
          <h1 className={styles.VillaName}>Villa Name</h1>
        </div>
        <div>
          <h3 className={styles.StrVilla}>Villa Street</h3>
        </div>
      </div>
      <div className={styles.Icons}>
        <div className={styles.IconAndH6}>
          <img src={chartIcon} className={styles.Icon} />
          <h6 className={styles.IconH6}>Chart</h6>
        </div>
        <div className={styles.IconAndH6}>
          <img src={saveIcon} className={styles.Icon} />
          <h6 className={styles.IconH6}>Save</h6>
        </div>
        <div className={styles.IconAndH6}>
          <img src={shareIcon} className={styles.Icon} />
          <h6 className={styles.IconH6}>Share</h6>
        </div>
      </div>
    </div>
  );
};
export default Headline;
