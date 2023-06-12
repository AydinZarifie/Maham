import trueIcon from "../../../images/Tik.svg";
import falseIcon from "../../../images/Zarb.svg";
import lockIcon from "../../../images/SVGRepo_iconCarrier (3).svg";

const EstateTableItem = (props) => {
  return (
    <>
      <tr>
        <td>{props.name}</td>
        <td>{props.price}</td>
        <td>{props.change24}</td>
        <td>{props.change7}</td>
        <td>{props.volume}</td>
        <td>{props.contractAddress}</td>
        <td>{props.landlordAddress}</td>
        <td>
          {props.sellPosition && <img src={trueIcon} />}
          {!props.sellPosition && <img src={falseIcon} />}
        </td>
        <td>
          <img src={lockIcon} />
        </td>
      </tr>
    </>
  );
};

export default EstateTableItem;
