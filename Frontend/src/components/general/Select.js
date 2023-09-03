import { useEffect, useRef, useState } from "react";

import arrowIcon from "../../images/arrow-down-svgrepo-com.svg";

import styles from "../../styles/select.module.css";

const Select = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef();

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const selectEventHandler = (option) => {
    props.set(option);
    toggleDropdown();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div
        className={`${styles.selection} ${props.invalid ? styles.invalid : ""}`}
        style={props.style}
        onClick={toggleDropdown}
      >
        <span className={styles.selectedOption}>{props.selected}</span>
        <img
          src={arrowIcon}
          className={styles.ArrowIcon}
          alt="Arrow"
          style={
            showDropdown
              ? { transform: "rotate(180deg)", paddingLeft: "8px" }
              : { paddingLeft: "8px" }
          }
        />
      </div>
      <ul className={`${styles.options} ${showDropdown ? styles.visible : ""}`}>
        {props.items.length > 0 &&
          props.items.map((item, index) => (
            <li onClick={() => selectEventHandler(item)}>
              {props.imgs && props.imgs.length > 0 && (
                <img src={props.imgs[index]} className={styles.DropDownImg} />
              )}
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Select;
