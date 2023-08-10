import React, { useState } from "react";
import styles from "../../styles/MultiSelect.module.css";
import overlayStyles from "../../styles/overlay.module.css";

const MultiSelect = ({ options, onChange, selectedOptions,invalid }) => {
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
      <button
        type="button"
        className={buttonClass}
        onClick={toggleDropdown}
      >
        {isOpen ? "Close Options" : "Open Options"}
      </button>
      {isOpen && (
        <>
          <div className={overlayStyles.overlayWithoutBlur} onClick={toggleDropdown}></div>
          <div className={styles.dropdown} >
            <ul className={styles.options}>
              {options.map((option) => (
                <li
                  className={
                    selectedOptions.includes(option.filterName)
                      ? styles.selectedOption
                      : ""
                  }
                  key={option.filterName}
                  onClick={() => handleOptionClick(option)}
                >

                 {option.filterName}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <div className={styles.selectedTags}>
        {selectedOptions.map((option) => (
          <div key={option.filterName} className={styles.selectedTag}>
            {option.filterName}
            <span
              className={styles.removeTag}
              onClick={() => handleRemoveOption(option)}
            >
              &times;
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSelect;
