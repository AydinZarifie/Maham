import styles from "../../styles/informationModal.module.css";

const InformationModal = (props) => {
  return (
    <>
      <div className={styles.infoOvelay} onClick={props.onClose}></div>
      <div className={styles.InfoMain}>
        <div className={styles.summryInfo}>
          <div className={styles.CloseInfo} onClick={props.onClose} >&times;</div>
          <div className={styles.HeadInfo}>
            <div className={styles.QuestionMark}>?</div>
            The information of each section gives you a better understanding of
            that section
          </div>
          <h5>
            {props.text}
          </h5>
        </div>
      </div>
    </>
  );
};

export default InformationModal;
