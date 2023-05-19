import Item from "./Item";
import data from "../dummyData/data";
import styles from "../styles/Maham.module.css";

export default function Items() {
  const datas = data.map((item) => {
    return <Item key={item.id} {...item} />;
  });

  return <div className={styles.StateDiv}>{datas}</div>;
}
