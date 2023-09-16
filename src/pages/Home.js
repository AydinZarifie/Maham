import { useEffect, useState } from "react";
import styles from "./../styles/test.module.css";
import CustomTableItem from "./../components/CustomTableItem";
import SellDiv from "../components/SellDiv";

const Home = () => {
  const [mintId, setMintId] = useState("");
  const [sellShown, setSellShown] = useState("");
  const [homeData, setHomeData] = useState([
    {
      mintId: 23534,
      lock_position: "true",
      sell_position: "true",
      landlord_address:
        "0x12345678912345678912345678912345678912345678912345678912345678912345678",
      price: 23,
      status: "buy",
    },
    {
      mintId: 23424,
      lock_position: "true",
      sell_position: "true",
      landlord_address:
        "0x12345678912345678912345678912345678912345678912345678912345678912345678",
      price: 23,
      status: "sell",
    },
  ]);

  const mintIdEventHandler = (event) => {
    setMintId(event.target.value);
  };

  const submitMint = () => {
    console.log(mintId);
  };

  const submitSell = (mintId, sellPrice) => {
    // price for selling is in the sellPrice state
    // mint id of selling estate is in selectedMintId
    console.log(mintId, " is for sell for ", sellPrice);
    setSellShown("");
  };

  const submitBuy = (id) => {
    console.log(id, " is for buy");
  };

  useEffect(() => {
    const fetchData = async () => {
      // setHomeData([]);// use this for setting data
    };
    fetchData();
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            id="Mint"
            value={mintId}
            onChange={mintIdEventHandler}
            className={styles.Inputs}
          />
          <label className={styles.Label} htmlFor="Mint">
            <div className={styles.Text}>Mint ID</div>
          </label>
        </div>
        <button className={styles.MintBtn} onClick={submitMint}>
          Mint
        </button>
      </header>
      <div className={styles.TableDiv2}>
        <table className={styles.InfoTable2}>
          <thead>
            <tr>
              <th>Mint ID</th>
              <th>Lock position</th>
              <th>Sell position</th>
              <th>Landlor address</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {homeData.map((item) => (
              <tr key={item.mintId}>
                <td>{item.mintId}</td>
                <td>{item.lock_position}</td>
                <td>{item.sell_position}</td>
                <td>
                  <div className={styles.AddressTd}>
                    <CustomTableItem text={item.landlord_address} />
                  </div>
                </td>
                <td>{item.price} ETH</td>
                <td>
                  {item.status == "buy" && (
                    <button
                      className={styles.BuyBtn}
                      onClick={() => submitBuy(item.mintId)}
                    >
                      Buy
                    </button>
                  )}
                  {item.status == "sell" && (
                    <button
                      className={styles.SellBtn}
                      onClick={() => setSellShown(item.mintId)}
                    >
                      Sell
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sellShown && (
        <SellDiv
          onSubmit={submitSell}
          mintId={sellShown}
          onClose={() => {
            setSellShown("");
          }}
        />
      )}
    </>
  );
};

export default Home;
