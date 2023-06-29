import styles from "../../../styles/Management.module.css";
import countryLogo from "../../../images/germany-32.png";

const CountryAndCityMenuItem = (props) => {
  return (
    <span className={styles.logoSpan} onClick={()=>props.clickHandler(props.name)}>
      {props.img && <img src={countryLogo} className={styles.countryImages} />}
      <div className={styles.MenuItem}>{props.name}</div>
    </span>
  );
};

export default CountryAndCityMenuItem;
