import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import ConfingEstate from "../../pages/ConfingEstatePage";
import data from "../../dummyData/data";

const EditState = () => {
  console.log("qqqqqqqq");
    const data = useRouteLoaderData("estate-detail"); 
    console.log(data);
  return <ConfingEstate method="PUT" estate={data} />;
};

export default EditState;
