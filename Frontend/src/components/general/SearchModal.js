import styles from "../../styles/homePage.module.css"

import overlayStyles from "../../styles/overlay.module.css"

const SearchModal = (props) => {
  return (
    <div className={styles.SerchINOpenDiv}>
      <div className={overlayStyles.overlay2} onClick={props.closeHandler}></div>
      <div id="modal-content2" className={styles.modalContent2}>
        <span className={styles.close2} onClick={props.closeHandler}>
          &times;
        </span>

        <div className={styles.inputContainer2}>
          <form className={styles.searchContainer}>
            <input
              type="text"
              className={`${styles.searchBox} ${styles.searchBar}`}
              placeholder="What can I help you with today?"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
