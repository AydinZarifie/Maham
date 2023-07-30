import styles from "../../styles/verification.module.css";

import attentionIcon from "../../images/attention-svgrepo-com.svg";

const StepOne = (props) => {
  return (
    <div className={styles.AlertDiv}>
      <div className={styles.AtenDiv}>
        <img src={attentionIcon} className={styles.AtenIcon} />
        <h2>pay attention</h2>
      </div>
      <p>
        Information such as name, surname, country, city and passport ID should
        be entered based on the passport, otherwise, the consequences of this
        work are with the user.
      </p>
      <button onClick={props.clickHandler} className={styles.AgreeBtn}>
        agree
      </button>
    </div>
  );
};

export default StepOne;
