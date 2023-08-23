import React, { useState } from "react";
import styles from "../../styles/MultiSelect.module.css";
import overlayStyles from "../../styles/overlay.module.css";
import arrowDownIcon from "../../images/arrow-down-svgrepo-com.svg";
import orangeTickIcon from "../../images/tick-orange-svgrepo-com.svg";
const MultiSelect = ({ options, onChange, selectedOptions, invalid }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    const isSelected = selectedOptions.includes(option);
    if (isSelected) {
      onChange(selectedOptions.filter((item) => item !== option));
    } else {
      onChange([...selectedOptions, option]);
    }
  };

  const handleRemoveOption = (option) => {
    onChange(selectedOptions.filter((item) => item !== option));
  };

  const buttonClass = invalid
    ? `${styles.invalid} ${styles.toggleButton} `
    : `${styles.toggleButton} `;

  return (
    <div className={styles.multiSelect}>
      <div className={styles.MultiSelectBody}>
        <div className={styles.selectedTags} style={selectedOptions.length > 0 ? {border:'1px solid #ff990a ',borderRight:'none'}:{}}>
          {selectedOptions.length === 0 && "Select filter"}
          {selectedOptions.length >0 && selectedOptions.map((option) => (
            <div key={option} className={styles.selectedTag}>
              {option}
              <span
                className={styles.removeTag}
                onClick={() => handleRemoveOption(option)}
              >
                &times;
              </span>
            </div>
          ))}
        </div>
        <button type="button" className={buttonClass} style={selectedOptions.length > 0 ? {border:'1px solid #ff990a ',borderLeft:'none'}:{}} onClick={toggleDropdown}>
          <img src={arrowDownIcon} className={styles.ArrowIcon} />
        </button>
      </div>
      {isOpen && (
        <>
          <div
            className={overlayStyles.overlayWithoutBlur}
            onClick={toggleDropdown}
          ></div>
          <div className={styles.dropdown}>
            <ul className={styles.options}>
              {options.length >0 && options.map((option) => (
                <li
                  className={
                    selectedOptions.includes(option)
                      ? styles.selectedOption
                      : ""
                  }
                  key={option}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                  <div className={styles.square} style={selectedOptions.includes(option) ? {}:{backgroundColor:'transparent'}}>
                    {selectedOptions.includes(option) ? (
                      <img
                        src={orangeTickIcon}
                        className={styles.OrangeTick}
                        alt="tick"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default MultiSelect;
