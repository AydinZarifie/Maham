import AdminNavbar from "./AdminNavbar";
import { Outlet } from "react-router-dom";

const AdminPage = () => {
  return (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  );
};

export default AdminPage;
