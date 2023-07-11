import styles from "../../styles/Admin.module.css";

import { NavLink } from "react-router-dom";

const AdminMenuItem = (props) => {
  return (
    <NavLink
      className={({ isActive }) => (isActive ? styles.active : undefined)}
      to={props.link}
      onClick={props.onClick}
      end={props.end}
    >
      <span className={styles.Dashboard2}>
        <img src={props.imgSrc} className={styles.DashboardIcn} />
        {props.text}
      </span>
    </NavLink>
  );
};

export default AdminMenuItem;
