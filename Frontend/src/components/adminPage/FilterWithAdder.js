import styles from "../../styles/Estate.module.css";
import filterData from "../../dummyData/filterData";
import Filter from "../Filter";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

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
      <div className={styles.form1}>
        <form
          className={styles.CountryFilter}
          method="post"
          encType="multipart/form-data"
        >
          <div className={styles.Container} ref={slideRef}>
            <div className={styles.content}>
              <div className={styles.scrollbar}>{datas}</div>
            </div>
          </div>
          <button className={styles.slideLeft} type="button" onClick={goToLeft}>
            ❮
          </button>
          <button
            className={styles.slideRight}
            type="button"
            onClick={goToRight}
          >
            ❯
          </button>
        </form>
      </div>

      <Link to="new">
        <button className={styles.iconBtn}>
          <div className={styles.addIcon}> + </div>
        </button>
      </Link>
    </div>
  );
}
