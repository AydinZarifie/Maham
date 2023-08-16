import styles from "../../../styles/watchlist.module.css";

const SearchComponent = () => {
  return (
    <div className={styles.SearchOpenDiv}>
      <div className={styles.SearchOpenDivHead}>
        <h5>Tittle</h5>
        <h5>Country</h5>
        <h5>City</h5>
      </div>
      <div className={styles.SearchOpenDivItem}>
        <h5>bech home</h5>
        <h5>United state</h5>
        <h5>California</h5>
      </div>
    </div>
  );
};

export default SearchComponent;
