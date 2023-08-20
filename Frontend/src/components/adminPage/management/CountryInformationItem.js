import styles from "../../../styles/Management.module.css";

const CountryInformationItem = (props) => {
  return (
    <tr>
      <td>
        <img
          // src={require(`../../../images/${props.img}`)}
          src={`http://localhost:5000/${props.img.replace(
            /\\/g,
            "/"
          )}`}
          className={styles.CountryImage}
        />
      </td>
      <td>{props.name}</td>
      <td>{props.number}</td>
      <td>{props.volume}</td>
    </tr>
  );
};

export default CountryInformationItem;
