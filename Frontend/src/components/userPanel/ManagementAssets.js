import styles from "../../styles/userPanel.module.css";

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
import { Pie, Bar } from "react-chartjs-2";
import { useRef, useState } from "react";
import { NavLink, Outlet, useOutletContext } from "react-router-dom";
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
export const options2 = {
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

const ManagementAssets = () => {
  const { tutorial } = useOutletContext();

  return (
    <>
      <div className={styles.TableMainDiv}>
        <div className={styles.MenuDiv}>
          <div className={styles.MenuButtonsDiv}>
            <div>
              <NavLink
                // className={`${styles.tab} ${styles.AssetsBtn}`}
                // onClick="ToggleClass1()"
                className={({ isActive }) =>
                  isActive ? styles.tab : styles.tab2
                }
                to=""
                end
              >
                Assets
              </NavLink>
              {tutorial && <div className={styles.questionMarkCircle}>?</div>}
            </div>
            <div>
              <NavLink
                // className={`${styles.tab2} ${styles.TransactionBtn}`}
                // onClick="ToggleClass2()"
                className={({ isActive }) =>
                  isActive ? styles.tab : styles.tab2
                }
                to="transactions"
              >
                Transaction
              </NavLink>
              {tutorial && <div className={styles.questionMarkCircle}>?</div>}
            </div>
          </div>
        </div>
        <Outlet />
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
              options={options}
              style={{ display: "inline", cursor: "pointer" }}
            />
          </div>
        </div>
        <div className={styles.BarDiv}>
          <Bar
            data={data2}
            options={options2}
            style={{ display: "inline", cursor: "pointer" }}
          />
        </div>
      </div>
    </>
  );
};

export default ManagementAssets;
