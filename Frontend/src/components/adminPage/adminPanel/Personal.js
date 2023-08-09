import { useEffect, useState } from "react";
import AdminConfig from "./AdminConfig";
import fetchInstance from "../../../util/fetchInstance";

const Personal = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      let { response, data } = await fetchInstance("/admin/auth/personal");
      setData(data);
    };
    fetchData();
  }, []);

  return <AdminConfig method="PUT" admin={data} />;
};

export default Personal;
