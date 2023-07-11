//old
import styles from "../styles/Maham.module.css";

import data from "../dummyData/data";

import Item from "./Item";

export default function Items() {
  const datas = data.map((item) => {
    return <Item key={item.id} {...item} />;
  });

  return <div className={styles.StateDiv}>{datas}</div>;
}
