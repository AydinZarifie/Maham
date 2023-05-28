import ItemInAdmin from "./ItemInAdmin";
import styles from "../../styles/Estate.module.css";
import arrow from "../../images/up-arrow-svgrepo-com.svg";
// import data from "../../dummyData/data"

const ItemsInAdmin = ({data}) => (
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
