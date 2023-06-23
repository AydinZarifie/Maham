import AdminNavbar from "../../components/adminPage/AdminNavbar";
import { Outlet, redirect } from "react-router-dom";

const AdminPage = () => {
  return (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  );
};

export default AdminPage;

// export async function action({ request, params }) {
//   const method = request.method;
//   const data = await request.formData();

//   const formData = new FormData();

//   formData.append("title", data.get("title"));
//   formData.append("cityName", data.get("cityName"));
//   formData.append("countryName", data.get("countryName"));
//   formData.append("streetName", data.get("streetName"));
//   formData.append("plate", data.get("plate"));
//   formData.append("numberOfPlate", data.get("numberOfPlate"));
//   formData.append("numberOfFloor", data.get("numberOfFloor"));
//   formData.append("location", data.get("location"));

//   formData.append("type", data.get("type"));

//   formData.append("checkBedroom", data.get("checkBedroom"));
//   formData.append("numberBedroom", data.get("numberBedroom"));
//   formData.append("metrageBedroom", data.get("metrageBedroom"));

//   formData.append("checkLivingRoom", data.get("checkLivingRoom"));
//   formData.append("numberLivingRoom", data.get("numberLivingRoom"));
//   formData.append("metrageLivingRoom", data.get("metrageLivingRoom"));

//   formData.append("checkKitchen", data.get("checkKitchen"));
//   formData.append("numberKitchen", data.get("numberKitchen"));
//   formData.append("metrageKitchen", data.get("metrageKitchen"));

//   formData.append("checkDiningroom", data.get("checkDiningroom"));
//   formData.append("numberDiningroom", data.get("numberDiningroom"));
//   formData.append("metrageDiningroom", data.get("metrageDiningroom"));

//   formData.append("checkGuestroom", data.get("checkGuestroom"));
//   formData.append("numberGuestroom", data.get("numberGuestroom"));
//   formData.append("metrageGuestroom", data.get("metrageGuestroom"));

//   formData.append("checkBathroom", data.get("checkBathroom"));
//   formData.append("numberBathroom", data.get("numberBathroom"));
//   formData.append("metrageBathroom", data.get("metrageBathroom"));

//   formData.append("checkGarden", data.get("checkGarden"));
//   formData.append("numberGarden", data.get("numberGarden"));
//   formData.append("metrageGarden", data.get("metrageGarden"));

//   formData.append("checkBalcony", data.get("checkBalcony"));
//   formData.append("numberBalcony", data.get("numberBalcony"));
//   formData.append("metrageBalcony", data.get("metrageBalcony"));

//   formData.append("checkGarage", data.get("checkGarage"));
//   formData.append("numberGarage", data.get("numberGarage"));
//   formData.append("metrageGarage", data.get("metrageGarage"));

//   formData.append("checkWifi", data.get("checkWifi"));
//   formData.append("checkParking", data.get("checkParking"));
//   formData.append("checkPool", data.get("checkPool"));
//   formData.append("checkFurniture", data.get("checkFurniture"));
//   formData.append("checkElevator", data.get("checkElevator"));
//   formData.append("checkGarden", data.get("checkGarden"));
//   formData.append("checkLaundary", data.get("checkLaundary"));
//   formData.append("checkBbq", data.get("checkBbq"));
//   formData.append("checkGym", data.get("checkGym"));

//   formData.append("description", data.get("description"));

//   let url =
//     "https://react2-7c43a-default-rtdb.asia-southeast1.firebasedatabase.app/estates.json";

//   if (method === "PATCH") {
//     const estateId = params.estateId;
//     url =
//       "https://react2-7c43a-default-rtdb.asia-southeast1.firebasedatabase.app/estates.json" +
//       estateId;
//   }

//   const response = await fetch(url, {
//     method: method,
//     body: formData,
//   });

//   if (response.status === 422) {
//     return response;
//   }

//   if (!response.ok) {
//     throw json({ message: "Could not save estate." }, { status: 500 });
//   }

//   return redirect("/admin/estates");
// }
