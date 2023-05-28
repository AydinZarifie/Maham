import { useRouteLoaderData } from "react-router-dom";
import ConfingEstate from "./ConfingEstate";

const EditState = () => {
  const data = useRouteLoaderData("estate-detail");
  return <ConfingEstate method="PATCH" estate={data} />;
};

export default EditState;
