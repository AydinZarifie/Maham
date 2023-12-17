import styles from "../../styles/preferences.module.css";

import data from "../../dummyData/newFilterData";

import { useRef } from "react";

import FilterItem from "./FilterItem";

const Filters = (props) => {
  const filter = useRef(null);
  const leftButton = useRef(null);
  const rightButton = useRef(null);

  const goToRight = () => {
    filter.current.scrollLeft += 170;
  };

  const goToLeft = () => {
    filter.current.scrollLeft -= 170;
  };

  const scrollHandler = () => {
    var scrollx = filter.current.scrollLeft;
    var scrollx2 = filter.current.clientWidth;
    var scrollx3 = filter.current.scrollWidth;
    if (scrollx > 0) {
      leftButton.current.style.opacity = "1";
    } else {
      leftButton.current.style.opacity = ".2";
    }
    if (scrollx + scrollx2 >= scrollx3 - 1) {
      rightButton.current.style.opacity = ".2";
    } else {
      rightButton.current.style.opacity = "1";
    }
  };

  return (
    <div
      className={props.admin ? `${styles.FilterAdmin}` : `${styles.Filter}`}
    >
      <div>
        <button
          ref={leftButton}
          onClick={goToLeft}
          className={styles.slideLeft}
          type="button"
        >
          ❮
        </button>
      </div>

      <div
        onScroll={scrollHandler}
        id="FilterMenu"
        ref={filter}
        className={styles.FilterMenu}
      >
        <div className={styles.menuBig}>
          {props.filters.length > 0 &&
            props.filters.map((filter) => {
              return (
                <FilterItem
                  key={filter.filterName}
                  name={filter.filterName}
                  img={filter.filterImageUrl}
                  onClick={props.onClick}
                />
              );
            })}
        </div>
      </div>

      <div>
        <button
          ref={rightButton}
          onClick={goToRight}
          className={styles.slideRight}
          type="button"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Filters;
