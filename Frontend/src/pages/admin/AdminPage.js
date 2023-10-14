import AdminNavbar from "../../components/adminPage/AdminNavbar";
import { Outlet, useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import { WalletContextProvider } from "../../store/wallet-context";

const AdminPage = () => {
  const token = useLoaderData();

  useEffect(() => {
    if (!token) {
      return;
    }
  }, [token]);

  return (
    <WalletContextProvider>
      <AdminNavbar />
      <Outlet />
    </WalletContextProvider>
  );
};

export default AdminPage;
