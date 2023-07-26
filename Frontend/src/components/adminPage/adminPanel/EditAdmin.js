import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import AdminConfig from "./AdminConfig";
import fetchInstance from "../../../util/fetchInstance";

const EditAdmin = () => {
  const data = useLoaderData();
  return <AdminConfig method="PUT" estate={data} />;
};

export async function loader({ request, params }) {
    const id = params.adminId;
    console.log('hello');
    let { response,data } = await fetchInstance("url" + id);
    return data;
  }

export default EditAdmin;
