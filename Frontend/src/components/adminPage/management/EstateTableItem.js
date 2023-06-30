import trueIcon from "../../../images/Tik.svg";
import falseIcon from "../../../images/Zarb.svg";
import lockIcon from "../../../images/SVGRepo_iconCarrier (3).svg";

import styles from "../../../styles/Management.module.css";

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
        <td>{props.name}</td>
        <td>{props.price}</td>
        <td style={className24}>{props.change24}</td>
        <td style={className7}>{props.change7}</td>
        <td>{props.volume}</td>
        <td>{props.contractAddress}</td>
        <td>{props.landlordAddress}</td>
        <td>
          {props.sellPosition && <span>true</span>}
          {!props.sellPosition && <span>false</span>}
        </td>
        <td>
          {props.lock && <span>true</span>}
          {!props.lock && <span>false</span>}
        </td>
        <td>
          <button>
            <img src={lockIcon} />
          </button>
        </td>
      </tr>
    </>
  );
};

export default EstateTableItem;
