import { useEffect, useState } from "react";
import styles from "./styles/test.module.css";
import CustomTableItem from "./components/CustomTableItem";

const App = () => {
  const [home, setHome] = useState(true);
  const [mintId, setMintId] = useState("");
  // const [wallet,setWallet]=useState("")
  const [sellDiv, setSellDiv] = useState(false);
  const [sellPrice, setSellPrice] = useState("");
  const [selectedMintId, setSelectedMintId] = useState("");
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
  const [sellData, setSellData] = useState([
    {
      mintId: 23534,
      lock_position: "true",
      sell_position: "true",
      landlord_address:
        "0x12345678912345678912345678912345678912345678912345678912345678912345678",
      price: 23,
    },
    {
      mintId: 23424,
      lock_position: "true",
      sell_position: "true",
      landlord_address:
        "0x12345678912345678912345678912345678912345678912345678912345678912345678",
      price: 23,
    },
  ]);

  const mintIdEventHandler = (event) => {
    setMintId(event.target.value);
  };

  const sellPriceEventHandler = (event) => {
    setSellPrice(event.target.value);
  };

  const openSellDiv = (id) => {
    setSellDiv(true);
    setSelectedMintId(id);
  };

  const submitMint = () => {
    console.log(mintId);
  };

  const submitWallet = () => {
    console.log("button clicked");
  };

  const submitSell = () => {
    // price for selling is in the sellPrice state
    // mint id of selling estate is in selectedMintId
    console.log(selectedMintId, " is for sell for ", sellPrice);
  };

  const submitBuy = (id) => {
    console.log(id, " is for buy");
  };

  // const shortText =
  //   props.text.slice(0, 5) +
  //   "..." +
  //   props.text.slice(props.text.length - 5, props.text.length);

  useEffect(() => {
    const fetchData = async () => {
      // setHomeData([]);// use this for setting data
    };
    fetchData();
  }, []);

  return (
    <div className={styles.Main}>
      {/*  */}
      <div className={styles.Menu}>
        <div className={styles.underline}>
          <a onClick={() => setHome(true)}>home</a>
        </div>
        <div className={styles.underline}>
          <a
            onClick={async () => {
              // const responese = await fetch("url");
              // const data = await responese.json();
              // setSellData(data);
              setHome(false);
            }}
          >
            Assets
          </a>
        </div>
      </div>
      {/*  */}

      {home && (
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

            <button
              className={styles.ConnectWalletBtn}
              role="button"
              onClick={submitWallet}
            >
              Connect Wallet
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
                        {/* 0x346...45821
                    <img
                      src="../public/img/copy-documents-duplicate-svgrepo-com.svg"
                      className={styles.CopyIcon}
                    /> */}
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
                          onClick={() => openSellDiv(item.mintId)}
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
        </>
      )}

      {!home && (
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
              {sellData.map((item) => (
                <tr key={item.mintId}>
                  <td>{item.mintId}</td>
                  <td>{item.lock_position}</td>
                  <td>{item.sell_position}</td>
                  <td>
                    <div className={styles.AddressTd}>
                      <CustomTableItem text={item.landlord_address} />
                      {/* 0x346...45821
                    <img
                      src="../public/img/copy-documents-duplicate-svgrepo-com.svg"
                      className={styles.CopyIcon}
                    /> */}
                    </div>
                  </td>
                  <td>{item.price} ETH</td>
                  <td>
                    <button
                      className={styles.SellBtn}
                      onClick={() => openSellDiv(item.mintId)}
                    >
                      Sell
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {sellDiv && (
        <>
          <div
            className={styles.SellOverlay}
            onClick={() => {
              setSellPrice("");
              setSelectedMintId("");
              setSellDiv(false);
            }}
          ></div>
          <div className={styles.SellDiv}>
            <div
              className={styles.CloseSellDiv}
              onClick={() => {
                setSellPrice("");
                setSelectedMintId("");
                setSellDiv(false);
              }}
            >
              &times;
            </div>
            <div className={styles.inputContainer2}>
              <input
                type="text"
                id="Price"
                value={sellPrice}
                onChange={sellPriceEventHandler}
                className={styles.PriceInputs}
              />
              <label className={styles.PriceLabel} htmlFor="Price">
                <div className={styles.PriceText}>Price</div>
              </label>
            </div>
            <button className={styles.SellBtn2} onClick={() => submitSell()}>
              Sell
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
