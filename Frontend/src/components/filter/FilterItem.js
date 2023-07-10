import styles from "../../styles/homePage.module.css";

const FilterItem = (props) => {
  return (
    <div className={styles.underline2}>
    <a href="#" className={styles.AfilterTag}>
      {/* <span className={styles.imgandname}> */}
        <img
          src={require(`../../images/${props.img}`)}
          alt={props.name}
          className={styles.FilterIcn}
        />
       
      {/* </span>  */}
      {props.name}
    </a>
    </div>
  );
};

export default FilterItem;
