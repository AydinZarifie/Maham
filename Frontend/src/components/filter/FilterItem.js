import styles from "../../styles/preferences.module.css";

const FilterItem = (props) => {
  return (
    <div className={styles.underline2} key={props.name} onClick={()=>props.onClick(props.name)}>
      <a href="#" className={styles.AfilterTag}>
        <img
          // src={require(`../../images/${props.img}`)}
          src={`http://localhost:5000/${props.img.replace(/\\/g, "/")}`}
          alt={props.name}
          className={styles.FilterIcn}
        />
        {props.name}
      </a>
    </div>
  );
};

export default FilterItem;
