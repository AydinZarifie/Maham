import { Link } from "react-router-dom";

import styles from "../../styles/Admin.module.css";

const AdminMenuItem = (props) => {
  return (
    <Link to={props.link} onClick={props.onClick}>
      <span className={styles.Dashboard2}>
        <img src={props.imgSrc} className={styles.DashboardIcn} />
        {props.text}
      </span>
    </Link>
  );
};

export default AdminMenuItem;
