import styles from "../../styles/alert.module.css"

const Alert = (props) => {
  return (
    <>
    <div className={styles.OverlaySuccess} onClick={props.closeHandler}>
      <div className={styles.SuccessDiv}>
        <svg className={styles.progressCircle} width="73" height="73">
          <path
            d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"
            stroke={props.lineColor}
            stroke-width="3"
            fill="transparent"
          />
        </svg>
        <img src={props.img} className={styles.CompleteIcon} />
        <h2>{props.title}</h2>
        <p>{props.detail}</p>
        <button className={styles.OkBtn} onClick={props.closeHandler}>OK</button>
      </div>
      </div>
    </>
  );
};

export default Alert;
