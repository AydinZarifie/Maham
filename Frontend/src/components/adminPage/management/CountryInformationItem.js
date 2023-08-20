import styles from "../../../styles/Management.module.css";

const CountryInformationItem = (props) => {
  return (
    <tr>
      <td>
        <img
          // src={require(`../../../images/${props.img}`)}
          src={`http://localhost:5000/${props.country_logo.replace(
            /\\/g,
            "/"
          )}`}
          className={styles.CountryImage}
        />
      </td>
      <td>{props.country_name}</td>
      <td>{props.country_estates.length}</td>
      <td>-</td>
    </tr>
  );
};

export default CountryInformationItem;
