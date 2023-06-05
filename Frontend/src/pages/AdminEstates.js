import { useEffect, useState } from "react";
import FilterWithAdder from "../components/adminPage/FilterWithAdder";
import ItemsInAdmin from "../components/adminPage/ItemsInAdmin";

//dummy data
// const data = [
//   {
//     id: 1,
//     img: [
//       //../images/square social logo 400 x 400_0.webp  ../images/redelogo.webp
//     ],
//     cityName: "tehran",
//     countryName: "Iran",
//     stateView: "downtown",
//     price: "3.4",
//   },
//   {
//     id: 2,
//     img: [
//       //../images/square social logo 400 x 400_0.webp  ../images/redelogo.webp
//     ],
//     cityName: "tehran",
//     countryName: "Iran",
//     stateView: "downtown",
//     price: "3.4",
//   },
// ];

export default function Estates() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/admin/posts")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  return (
    <>
      <FilterWithAdder />

      {data.length > 0 && <ItemsInAdmin data={data} />}
    </>
  );
}
