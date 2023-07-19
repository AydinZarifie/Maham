import styles from "../../../styles/AdminPanel.module.css";

import { useOutletContext } from "react-router-dom";

import AdminItem from "./AdminItem";

const AdminList = () => {
  const { admins } = useOutletContext();
  return (
    <div className={styles.AdminInformation}>
      {admins.length > 0 && admins.map((admin) => <AdminItem {...admin} />)}
    </div>
  );
};

export default AdminList;