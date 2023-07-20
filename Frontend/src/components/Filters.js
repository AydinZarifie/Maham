//old

import styles from "../styles/Maham.module.css";

import filterData from "../dummyData/filterData";

import { useRef } from "react";

import Filter from "./Filter";

export default function Filters() {
  const slideRef = useRef(null);

  function goToRight() {
    slideRef.current.scrollLeft += 170;
  }
  function goToLeft() {
    slideRef.current.scrollLeft -= 170;
  }

  const datas = filterData.map((item) => {
    return <Filter key={item.id} {...item} />;
  });

  return (
    <form className={styles.CountryFilter} method="post">
      <div ref={slideRef} className={styles.Container}>
        <div className={styles.content}>
          <div className={styles.scrollbar} id="style-1">
            {datas}
          </div>
        </div>
      </div>
      <button className={styles.slideLeft} type="button" onClick={goToLeft}>
        ❮
      </button>
      <button className={styles.slideRight} type="button" onClick={goToRight}>
        ❯
      </button>
    </form>
  );
}
