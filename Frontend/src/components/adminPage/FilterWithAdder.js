import styles from "../../styles/Estate.module.css";
import filterData from "../../dummyData/filterData";
import Filter from "../Filter";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Filters from "../filter/Filters";

export default function FilterWithAdder() {
  const datas = filterData.map((item) => {
    return <Filter key={item.id} {...item} />;
  });

  //-----------------------------

  const slideRef = useRef(null);

  function goToRight() {
    slideRef.current.scrollLeft += 170;
  }
  function goToLeft() {
    slideRef.current.scrollLeft -= 170;
  }

  return (
    <div className={styles.CountryFilterAndAdder}>
      {/* <button className={styles.slideLeft} type="button" onClick={goToLeft}>
        ❮
      </button>
      <form
        className={styles.CountryFilter}
        method="post"
        encType="multipart/form-data"
        ref={slideRef}
      >
        <div className={styles.scrollbar}>
          {datas}
          </div>
      </form>
      <button className={styles.slideRight} type="button" onClick={goToRight}>
        ❯
      </button> */}

      <Filters admin={true} />

      <Link to="new">
        <button className={styles.iconBtn}>
          <div className={styles.addIcon}> + </div>
        </button>
      </Link>
    </div>
  );
}
