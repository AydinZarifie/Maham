import styles from "../../../styles/AdminPanel.module.css";

import { useOutletContext } from "react-router-dom";

import AdminItem from "./AdminItem";

const AdminList = () => {
  const { admins, deleteHandler } = useOutletContext();
  return (
    <div className={styles.AdminInformation}>
      {admins.length > 0 &&
        admins.map((admin) => (
          <AdminItem {...admin} deleteHandler={deleteHandler} />
        ))}
      {/*  */}
      {/* <AdminItem
        first_name="ali"
        last_name="hashemi"
        admin_type="super"
        country_name="iran"
        city_name='tabriz'
        _id='23'
        deleteHandler={deleteHandler}
      /> */}
      {/* <AdminItem firstname="kmk" deleteHandler={deleteHandler} />
      <AdminItem firstname="kmk" deleteHandler={deleteHandler} />
      <AdminItem firstname="kmk" deleteHandler={deleteHandler} />
      <AdminItem firstname="kmk" deleteHandler={deleteHandler} />
      <AdminItem firstname="kmk" deleteHandler={deleteHandler} />
      <AdminItem firstname="kmk" deleteHandler={deleteHandler} />
      <AdminItem firstname="kmk" deleteHandler={deleteHandler} />
      <AdminItem firstname="kmk" deleteHandler={deleteHandler} />
      <AdminItem firstname="kmk" deleteHandler={deleteHandler} />
      <AdminItem firstname="kmk" deleteHandler={deleteHandler} />
      <AdminItem firstname="kmk" deleteHandler={deleteHandler} />
      <AdminItem firstname="kmk" deleteHandler={deleteHandler} />
      <AdminItem firstname="kmk" deleteHandler={deleteHandler} />
      <AdminItem firstname="kmk" deleteHandler={deleteHandler} /> */}
      {/*  */}
    </div>
  );
};

export default AdminList;
