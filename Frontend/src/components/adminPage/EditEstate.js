import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import ConfingEstate from "../../pages/ConfingEstatePage";

const EditState = () => {
  const data = useRouteLoaderData("estate-detail");
  return <ConfingEstate method="PUT" estate={data}  />;
};

export default EditState;