import { useState } from "react";
import styles from "../../styles/homePage.module.css";
import overlayStyles from "../../styles/overlay.module.css";

const SearchModal = (props) => {
  const [searchPhrase, setSearchPhrase] = useState("");

  const eventHandler = (event) => {
    const { value } = event.target;
    setSearchPhrase(value);
  };

  return (
    <div className={styles.SerchINOpenDiv}>
      <div
        className={overlayStyles.overlay2}
        onClick={props.closeHandler}
      ></div>
      <div id="modal-content2" className={styles.modalContent2}>
        <span className={styles.close2} onClick={props.closeHandler}>
          &times;
        </span>

        <div className={styles.inputContainer2}>
          <form
            onSubmit={() => {
              props.submitSearch(searchPhrase);
            }}
            className={styles.searchContainer}
          >
            <input
              type="text"
              className={`${styles.searchBox} ${styles.searchBar}`}
              placeholder="What can I help you with today?"
              value={searchPhrase}
              onChange={eventHandler}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
