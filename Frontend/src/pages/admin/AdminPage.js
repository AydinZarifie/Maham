import AdminNavbar from "../../components/adminPage/AdminNavbar";
import { Outlet, useLoaderData } from "react-router-dom";
import { useEffect } from "react";

const AdminPage = () => {
  const token = useLoaderData();

  useEffect(() => {
    if (!token) {
      return;
    }
  }, [token]);

  return (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  );
};

export default AdminPage;
