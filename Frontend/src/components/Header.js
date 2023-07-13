//old
import styles from "../styles/Maham.module.css";

import Filters from "./Filters";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <div className={styles.Head}>
      <Navbar />
      <Filters />
    </div>
  );
}
