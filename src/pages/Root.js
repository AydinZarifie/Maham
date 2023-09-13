import styles from "../styles/test.module.css";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function RootLayout() {
  // const [wallet,setWallet]=useState("")

  const submitWallet = () => {
    console.log("button clicked");
  };

  return (
    <div className={styles.Main}>
      <Header onWalletClick={submitWallet} />
      <Outlet />
    </div>
  );
}

export default RootLayout;
