import styles from "../../styles/userPanel.module.css";

import ethIcon from "../../images/ethereum-svgrepo-com.svg";

const Header = (props) => {
  // const shortText =
  //   props.text.slice(0, 5) +
  //   "..." +
  //   props.text.slice(props.text.length - 3, props.text.length);

  return (
    <header className={styles.HeaderDiv}>
      <div className={styles.Row1}>
        <div className={styles.FirstPart}>
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
                onmousemove="visibleAddress()"
                onmouseleave="hiddenAddress()"
              >0x619...912</h4>
              <p className={styles.longAddress}>
                0x61945678912345678912345678912345678912
              </p>
            </div>
          </div>
        </div>

        <div className={styles.EthPrice}>
          <img src={ethIcon} className={styles.EthIcn} />
          <h5 className={styles.EthPriceh5}>9876$</h5>
        </div>
        <div className={styles.questionMark} onClick={props.toggleTutorial}>
          <p>?</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
