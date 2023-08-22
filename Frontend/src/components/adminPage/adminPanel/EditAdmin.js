import { useLoaderData } from "react-router-dom";
import AdminConfig from "./AdminConfig";
import fetchInstance from "../../../util/fetchInstance";

const EditAdmin = () => {
  const data = useLoaderData();
  return <AdminConfig method="PUT" admin={data} />;
};

export async function loader({ request, params }) {
  const id = params.adminId;
  let { response, data } = await fetchInstance("/admin/panel/editAdmin/" + id);
  return data.data;
}

export default EditAdmin;
