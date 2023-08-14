import styles from "../../styles/userPanel.module.css";

import ethIcon from "../../images/ethereum-svgrepo-com.svg";
import logoImg from "../../images/Maham2.png";
import { useRef } from "react";

const Header = (props) => {
  // const shortText =
  //   props.text.slice(0, 5) +
  //   "..." +
  //   props.text.slice(props.text.length - 3, props.text.length);

  const longAddress = useRef();

  let delayDisplay;
  let delayDisplay2;

  function visibleAddress() {
    clearTimeout(delayDisplay2);
    clearTimeout(delayDisplay);
    delayDisplay = setTimeout(() => {
      longAddress.current.style.display = "flex";
      delayDisplay = setTimeout(() => {
        longAddress.current.style.opacity = "1";
      }, 50);
    }, 50);
  }

  function hiddenAddress() {
    clearTimeout(delayDisplay);
    clearTimeout(delayDisplay2);
    longAddress.current.style.opacity = "0";
    delayDisplay2 = setTimeout(() => {
      longAddress.current.style.display = "none";
    }, 500);
  }

  return (
    <header className={styles.HeaderDiv}>
      <div className={styles.Row1}>
        <div className={styles.FirstPart}>
          <div className={styles.LogoDivOutside}>
            <img src={logoImg} className={styles.LogoImg} />
          </div>
          <div className={styles.openSideNav} onClick={props.openNavHandler}>
            &#9776;
          </div>

          <div className={styles.NameAndAddress}>
            <h4 className={styles.UserName}>
              moein <strong>aghasijavid</strong>
            </h4>
            <div className={styles.addressDiv}>
              <h4
                className={styles.shortAddress}
                onMouseEnter={visibleAddress}
                onMouseLeave={hiddenAddress}
              >
                0x619...912
              </h4>
              <p ref={longAddress} className={styles.longAddress} >
                0x61945678912345678912345678912345678912
              </p>
            </div>
            {/* <div className={styles.addressDiv}>
              <h4 className={styles.shortAddress2}>Connect Wallet</h4>
            </div> */}
          </div>
        </div>

        <div className={styles.EthPrice}>
          <img src={ethIcon} className={styles.EthIcn} />
          <h5 className={styles.EthPriceh5}>9876$</h5>
        </div>
        <div className={styles.Question}>
          <div className={styles.questionMark} onClick={props.toggleTutorial}>
            <p>?</p>
          </div>
          <div className={styles.questionMark2}>
            <p>!</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
