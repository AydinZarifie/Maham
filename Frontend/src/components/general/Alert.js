import styles from "../../styles/alert.module.css";
import successIcon from "../../images/Group.png";
import ErrorIcon from "../../images/Vector.png";

const Alert = (props) => {
  //props => success, closeHandler ,  title, detail
  return (
    <>
      <div className={styles.OverlaySuccess} onClick={props.closeHandler}>
        <div className={styles.SuccessDiv}>
          {/* <svg className={styles.progressCircle} width="73" height="73">
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
        <button className={styles.OkBtn} onClick={props.closeHandler}>OK</button> */}
          <img
            src={props.success ? successIcon : ErrorIcon}
            className={styles.seccessIcon}
          />
          <h3 className={props.success ? styles.SuccessH3 : styles.ErrorH3}>
            {props.success ? "Success" : "Error !"}
          </h3>

          <h5 className={styles.BoldH5}>{props.title}</h5>
          <h5 className={styles.NormalH5}>{props.detail}</h5>
          <div className={styles.ButtonDiv}>
            {props.success && (
              <>
                <button
                  className={styles.continueBtn}
                  onClick={props.closeHandler}
                >
                  Continue
                </button>
                <button
                  className={styles.ViewDetailBtn}
                  onClick={props.closeHandler}
                >
                  View details
                </button>
              </>
            )}
            {!props.success && (
              <button
                className={styles.ViewErrorDetailBtn}
                onClick={props.closeHandler}
              >
                View error details
              </button>
            )}
          </div>
          {/*  */}
        </div>
      </div>
    </>
  );
};

export default Alert;
