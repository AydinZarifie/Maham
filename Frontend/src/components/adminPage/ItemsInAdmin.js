//old
import styles from "../../styles/Estate.module.css";

import arrow from "../../images/up-arrow-svgrepo-com.svg";

import ItemInAdmin from "./ItemInAdmin";

const ItemsInAdmin = ({ data }) => (
  <>
    <div className={styles.StateDiv}>
      {data.map((item) => (
        <ItemInAdmin key={item.id} {...item} />
      ))}
    </div>
    <a href="#" className={styles.top}>
      <img className={styles.TopImg} src={arrow} />
    </a>
  </>
);

export default ItemsInAdmin;
