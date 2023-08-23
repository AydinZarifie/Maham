import { useEffect, useState } from "react";
import styles from "../../../styles/watchlist.module.css";

const DailyDeals = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDailyDealsData = async () => {
      const response = await fetch("url for daily deals");
      const data = await response.json();
      setData(data.data);
    };

    fetchDailyDealsData();
  }, []);

  return (
    <div className={styles.TableDiv3}>
      <table className={styles.InfoTable3}>
        <thead>
          <tr>
            <th>Mint ID</th>
            <th>Country</th>
            <th>City</th>
            <th>Buy/Sell</th>
            <th>P/M</th>
            <th>Price</th>
            <th>tax</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((item) => (
              <tr>
                <td>{item.mint_id}</td>
                <td>{item.country_name}</td>
                <td>{item.city_name}</td>
                <td>{item.position}</td>
                <td>{item.PM}</td>
                <td>{item.price}</td>
                <td>{item.price} ETH</td>
              </tr>
            ))}
          <tr>
            <td>92457872</td>
            <td>United State</td>
            <td>California</td>
            <td>Sell</td>
            <td>.93</td>
            <td>12000 ETH</td>
            <td>12 ETH</td>
          </tr>
        </tbody>
      </table>
      {/*  */}
      {data.length == 0 && (
        <div className={styles.NoExistDiv}>
          There are no daily deals to display for you
        </div>
      )}

      {/*  */}
    </div>
  );
};

export default DailyDeals;
