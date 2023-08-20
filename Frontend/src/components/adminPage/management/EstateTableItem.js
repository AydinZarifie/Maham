import styles from "../../../styles/Management.module.css"

import lockIcon from "../../../images/SVGRepo_iconCarrier (3).svg";
import unlockIcon from "../../../images/unlock-svgrepo-com.svg";

const EstateTableItem = (props) => {
  const redStyle = {
    color: "red",
  };

  const greenstyle = {
    color: "green",
  };

  let className24;
  if (props.change24 > 0) {
    className24 = greenstyle;
  } else {
    className24 = redStyle;
  }

  let className7;
  if (props.change7 > 0) {
    className7 = greenstyle;
  } else {
    className7 = redStyle;
  }

  return (
    <>
      <tr>
        <td>{props.estate_title}</td>
        <td>{props.customer_price}</td>
        <td style={className24}>{props.change24}</td>
        <td style={className7}>{props.change7}</td>
        <td>{props.volume}</td>
        <td>{props.contractAddress}</td>
        <td>{props.landlordAddress}</td>
        <td>{props.sell_position.toString()}</td>
        <td>{props.lock_position.toString()}</td>
        <td>
          <button  className={styles.lockAndUnlockButton} onClick={() => props.lockEstate(props._id)}>
            {props.lock_position ? (
              <img className={styles.unlockIcon} src={unlockIcon} />
            ) : (
              <img src={lockIcon} />
            )}
          </button>
        </td>
      </tr>
    </>
  );
};

export default EstateTableItem;
