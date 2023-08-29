import styles from "../../../styles/userPanel.module.css";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        boxWidth: 10,
      },
    },
    title: {
      display: true,
      text: "Chart Of Assets",
    },
  },
};

export const options2 = {
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        boxWidth: 10,
      },
    },
    title: {
      display: true,
      text: "Chart Of Countries",
    },
  },
};

export const data = {
  labels: [
    "Red",
    "Blue",
    "Yellow",
    "Green",
    "Purple",
    "Orange",
    "sari",
    "germez",
  ],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3, 10, 4],
      backgroundColor: [
        "#fff0f3e4",
        "#ffccd5e4",
        "#ffb3c1e4",
        "#ff8fa3e4",
        "#ff758fe4",
        "#ff4d6de4",
        "#c9184ae4",
        "#a4133ce4",
        "#800f2fe4",
        "#590d22e4",
      ],
      borderColor: [
        "#fff0f3",
        "#ffccd5",
        "#ffb3c1",
        "#ff8fa3",
        "#ff758f",
        "#ff4d6d",
        "#c9184a",
        "#a4133c",
        "#800f2f",
        "#590d22",
      ],
      borderWidth: 1,
    },
  ],
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "sari",
  "germez",
];
export const options3 = {
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        boxWidth: 25,
      },
    },
  },
};
export const data2 = {
  labels,
  datasets: [
    {
      label: "P/M",
      data: labels.map(() => Math.random()),
      backgroundColor: "#ef4057",
    },
    {
      label: "User",
      data: labels.map(() => Math.random()),
      backgroundColor: "rgb(71, 157, 255)",
    },
  ],
};

const Assets = () => {
  const [assetsTableData, setAssetsTableData] = useState([]);

  useEffect(() => {
    const fetchAssetsTableData = async () => {
      const response = await fetch("url for data");
      const data = await response.json();
      setAssetsTableData(data.data);
    };
    fetchAssetsTableData();
  }, []);

  return (
    <>
      {/* for error */}
      {assetsTableData.length == 0 && (
        <div className={styles.NoExistDiv}>
          There is no assets to display for you
        </div>
      )}

      {/*  */}
      <div className={styles.TableDiv}>
        <table className={styles.InfoTable}>
          <thead>
            <tr>
              <th>Mint ID</th>
              <th>Country</th>
              <th>City</th>
              <th>P/M</th>
              <th>Buy Price</th>
              <th>Sell Price</th>
              <th>Lock Position</th>
            </tr>
          </thead>
          <tbody>
            {assetsTableData.length > 0 &&
              assetsTableData.map((item) => (
                <tr>
                  <td>{item.mint_id}</td>
                  <td>{item.country_name}</td>
                  <td>{item.city_name}</td>
                  <td>{item.pm}</td>
                  <td>{item.but_price} ETH</td>
                  <td>{item.sell_price} ETH</td>
                  <td>{item.lock_position}</td>
                </tr>
              ))}

            <tr>
              <td>34879627</td>
              <td>United State</td>
              <td>California</td>
              <td>0.89</td>
              <td>304800 ETH</td>
              <td>h258900 ETH</td>
              <td>False</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.TotalDiv}>
        <h3>Total:</h3>
        <h3>12508 ETH</h3>
        <h3>3450049 USD</h3>
      </div>

      <div className={styles.ChartsDiv}>
        <div className={styles.PieDiv}>
          <div className={styles.PieChart}>
            <Pie
              data={data}
              options={options}
              style={{ display: "inline", cursor: "pointer" }}
            />
          </div>
          <div className={styles.PieChart}>
            <Pie
              data={data}
              options={options2}
              style={{ display: "inline", cursor: "pointer" }}
            />
          </div>
        </div>
        <div className={styles.BarDiv}>
          <Bar
            data={data2}
            options={options3}
            style={{ display: "inline", cursor: "pointer" }}
          />
        </div>
      </div>
    </>
  );
};

export default Assets;
