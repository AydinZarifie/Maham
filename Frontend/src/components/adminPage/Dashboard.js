import styles from "../../styles/Admin.module.css";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import { useState } from "react";

import chartIcon from "../../images/chart-3-svgrepo-com.svg";
import ethIcon from "../../images/ethereum-svgrepo-com.svg";

export default function Dashboard() {
  const [value, onChange] = useState(new Date());
  const monthlyData = [
    { name: "January", monthlyVolume: 300 },
    { name: "February", monthlyVolume: 600 },
    { name: "March", monthlyVolume: 500 },
    { name: "April", monthlyVolume: 500 },
    { name: "May", monthlyVolume: 500 },
    { name: "June", monthlyVolume: 500 },
    { name: "July", monthlyVolume: 500 },
    { name: "August", monthlyVolume: 500 },
    { name: "September", monthlyVolume: 1500 },
    { name: "October", monthlyVolume: 500 },
    { name: "November", monthlyVolume: 500 },
    { name: "december", monthlyVolume: 500 },
  ];

  const dailyData = [
    { name: "1", dailyVolume: 200 },
    { name: "2", dailyVolume: 300 },
    { name: "3", dailyVolume: 100 },
    { name: "4", dailyVolume: 400 },
    { name: "5", dailyVolume: 400 },
    { name: "6", dailyVolume: 400 },
    { name: "7", dailyVolume: 400 },
    { name: "8", dailyVolume: 400 },
    { name: "9", dailyVolume: 400 },
    { name: "10", dailyVolume: 400 },
    { name: "11", dailyVolume: 400 },
    { name: "12", dailyVolume: 400 },
    { name: "13", dailyVolume: 400 },
    { name: "14", dailyVolume: 400 },
    { name: "15", dailyVolume: 400 },
    { name: "16", dailyVolume: 400 },
    { name: "17", dailyVolume: 400 },
    { name: "18", dailyVolume: 400 },
    { name: "19", dailyVolume: 400 },
    { name: "20", dailyVolume: 400 },
    { name: "21", dailyVolume: 400 },
    { name: "22", dailyVolume: 400 },
    { name: "23", dailyVolume: 400 },
    { name: "24", dailyVolume: 400 },
    { name: "25", dailyVolume: 400 },
    { name: "26", dailyVolume: 1400 },
    { name: "27", dailyVolume: 400 },
    { name: "28", dailyVolume: 400 },
    { name: "29", dailyVolume: 400 },
    { name: "30", dailyVolume: 400 },
    { name: "31", dailyVolume: 400 },
  ];
  return (
    <>
      <div className={styles.Container2}>
        <div className={styles.column3}>
          <div className={styles.Dashboard}>
            <h2 className={styles.h2Dashboard}>Dashboard</h2>
          </div>
          <div className={styles.TechInf}>
            <h5 className={styles.p3TechInf}>Technical Information</h5>
          </div>
        </div>
        <div>
          <hr className={styles.hrPurchase} />
        </div>

        <div className={styles.column45}>
          <div className={styles.column4}>
            <div className={styles.Price}>
              <div className={styles.EthIcn}>
                <img src={ethIcon} className={styles.EthIcon} alt="eth"/>
              </div>
              <div className={styles.EthPrice}>
                <h3 className={styles.h3EthPrice}>369.39 $</h3>
              </div>
            </div>
            <div className={styles.EthPrice2}>
              <h6 className={styles.h6EthPrice2}>Eth-Price</h6>
            </div>
          </div>

          <div className={styles.column5}>
            <div className={styles.PurChaseDiv}>
              <div className={styles.PurChase}>
                <h4 className={styles.h4PurChase}>Purchase</h4>
              </div>
              <div className={styles.PurChaseIcn}>
                <img src={chartIcon} className={styles.PurchaseIcon} alt="chart" />
              </div>
            </div>
            <div className={styles.TransactionPrice}>
              <h4 className={styles.h4TransactionPrice}>6669300 $</h4>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.Details}>
        <div className={styles.TotalIncomeDiv}>
          <div className={styles.TotalIncome}>
            <h4 className={styles.h4TotalIncome}>Total Income</h4>
          </div>
          <div className={styles.TotalIncomePrice}>
            <h2 className={styles.h2TotalIncomePrice}>210000000 $</h2>
          </div>
        </div>
        <div>
          <hr className={styles.hrDetails} />
        </div>
        <div className={styles.NbrODctDiv}>
          <div className={styles.NbrODct}>
            <h4 className={styles.h4NbrODct}>Number Of Documents</h4>
          </div>
          <div className={styles.NumberOfDocuments}>
            <h2 className={styles.h2NumberOfDocuments}>536</h2>
          </div>
        </div>
        <div>
          <hr className={styles.hrDetails} />
        </div>
        <div className={styles.NbrOCltDiv}>
          <div className={styles.NbrOClt}>
            <h4 className={styles.h4NbrOClt}>Number Of Clients</h4>
          </div>
          <div className={styles.NumberOfClients}>
            <h2 className={styles.h2NumberOfClients}>1690000</h2>
          </div>
        </div>
      </div>

      <div className={styles.ChartAndCalendar}>
        <div className={styles.Chart}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyData}>
              <Line type="monotone" dataKey="dailyVolume" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <XAxis dataKey="name" />
              <YAxis />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.Calendar}>
          <Calendar onChange={onChange} value={value} />
        </div>
      </div>
      <div className={styles.BarGraf}>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="monthlyVolume" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
