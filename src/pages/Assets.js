import { useEffect, useState } from "react";
import CustomTableItem from "../components/CustomTableItem";
import styles from "../styles/test.module.css";
import SellDiv from "../components/SellDiv";

const Assets = () => {
  const [assetsData, setAssetsData] = useState([
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
  const [sellShown, setSellShown] = useState("");

  const submitSell = (mintId, sellPrice) => {
    // price for selling is in the sellPrice state
    // mint id of selling estate is in selectedMintId
    console.log(mintId, " is for sell for ", sellPrice);
    setSellShown("");
  };

  const submitBurn=(mintId)=>{
    console.log(mintId, "is for burning");
  }

  useEffect(() => {
    const fetchData = async () => {
      // setAssetsData([]);// use this for setting data
    };
    fetchData();
  }, []);

  return (
    <>
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
            {assetsData.map((item) => (
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
                <td
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "5px",
                    justifyContent: "center",
                  }}
                >
                  <button
                    className={styles.SellBtn}
                    onClick={() => setSellShown(item.mintId)}
                  >
                    Sell
                  </button>
                  <button className={styles.BurnBtn} onClick={()=>submitBurn(item.mintId)}>Burn</button>
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

export default Assets;
