//old

import styles from "../styles/Maham.module.css";

export default function Filter(props) {
  return (
    <a className={styles.CountryTag}>
      <img
        width={32}
        height={32}
        src={require(`../images/${props.img}`)}
        alt="CountryImg"
        className={styles.CountryImg}
      />
      <p className={styles.CountryName}> {props.name}</p>
    </a>
  );
}
