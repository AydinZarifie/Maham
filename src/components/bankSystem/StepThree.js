import styles from "../../styles/test.module.css";
import tickIcon from "../../images/tick-svgrepo-com (1).svg";
const StepThree = () => {
  return (
    <>
      <div className={styles.StepThree}>
        <svg className={styles.progressCircle} width="73" height="73">
          <path
            d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"
            stroke="#0aff0e"
            strokeWidth="3"
            fill="transparent"
          />
        </svg>
        <img src={tickIcon} className={styles.CompleteIcon} />
        <h2>Success</h2>
        <h4>(You have successfully completed the steps)</h4>
        <h3>your total borrow: 7854 ETH</h3>
      </div>
    </>
  );
};

export default StepThree;
