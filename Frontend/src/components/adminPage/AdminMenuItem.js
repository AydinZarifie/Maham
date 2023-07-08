import { Link, NavLink } from "react-router-dom";

import styles from "../../styles/Admin.module.css";

const AdminMenuItem = (props) => {
  return (
    <NavLink  className={({ isActive }) => (isActive ? styles.active : undefined)} to={props.link} onClick={props.onClick} end>
      <span className={styles.Dashboard2}>
        <img src={props.imgSrc} className={styles.DashboardIcn} />
        {props.text}
      </span>
    </NavLink>
  );
};

export default AdminMenuItem;
