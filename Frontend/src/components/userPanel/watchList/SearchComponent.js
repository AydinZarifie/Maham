import { useEffect } from "react";
import styles from "../../../styles/watchlist.module.css";

const SearchComponent = (props) => {
  useEffect(() => {
    const syncWidths = () => {
      const div1 = document.getElementById("SearchOpenDiv");
      const div2 = document.getElementById("searchBox");
      const width = div2.offsetWidth;
      div1.style.width = width + "px";
    };

    syncWidths();
    window.addEventListener("resize", syncWidths);

    return () => {
      window.removeEventListener("resize", syncWidths);
    };
  }, []);
  return (
    <div className={styles.SearchOpenDiv} id="SearchOpenDiv">
      <div className={styles.SearchOpenDivHead}>
        <h5>Tittle</h5>
        <h5>Country</h5>
        <h5>City</h5>
      </div>
      <div className={styles.SearchOpenDivItem} onClick={()=>props.itemSelect("bech home")}>
        <h5>bech home</h5>
        <h5>United state</h5>
        <h5>California</h5>
      </div>
    </div>
  );
};

export default SearchComponent;
