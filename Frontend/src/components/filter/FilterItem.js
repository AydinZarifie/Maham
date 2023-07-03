import styles from "../../styles/homePage.module.css";

const FilterItem = (props) => {
  return (
    <a href="#">
      <span className={styles.imgandname}>
        <img
          src={require(`../../images/${props.img}`)}
          alt={props.name}
          className={styles.FilterIcn}
        />
        {props.name}
      </span>
    </a>
  );
};

export default FilterItem;
