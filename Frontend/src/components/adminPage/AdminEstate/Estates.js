import { Link } from "react-router-dom";

import styles from "../../../styles/AdminPanel.module.css";

import EstateItem from "../../general/EstateItem";
import { useOutletContext } from "react-router-dom";

const Estates = () => {
  const { data } = useOutletContext();
  return (
    <div className={styles.container2}>
      {data.length > 0 &&
        data.map((estate) => (
          <div className={styles.estateDiv}>
            <EstateItem props={estate} />
            <Link to={`${estate._id}`}>
              <button className={styles.editButton}>Edit</button>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Estates;
