import { useEffect, useState } from "react";
import FilterWithAdder from "./FilterWithAdder";
import ItemsInAdmin from "./ItemsInAdmin";

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
    fetch("url")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  return (
    <>
      <FilterWithAdder />
      <ItemsInAdmin data={data} />
    </>
  );
}