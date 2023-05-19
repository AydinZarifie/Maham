import Filters from "./Filters";
import Navbar from "./Navbar";
import styles from '../styles/Maham.module.css';

export default function Header() {
  return (
    <div className={styles.Head}>
      <Navbar />
      <Filters />
    </div>
  );
}
