import styles from "../../styles/homePage.module.css";

const FilterItem = (props) => {
  return (
    <div className={styles.underline2} key={props.name}>
      <a href="#" className={styles.AfilterTag}>
        <img
          src={require(`../../images/${props.img}`)}
          // src={`http://localhost:5000/${props.img.replace(/\\/g, "/")}`}
          alt={props.name}
          className={styles.FilterIcn}
        />
        {props.name}
      </a>
    </div>
  );
};

export default FilterItem;
