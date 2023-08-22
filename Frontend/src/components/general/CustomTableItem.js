import styles from "../../styles/customTableItem.module.css";

import copyIcon from "../../images/copy-documents-duplicate-svgrepo-com.svg";
import trueIcon from "../../images/tick-svgrepo-com_2.svg";
import {  useState } from "react";

const CustomTableItem = (props) => {
  const [copied, setCopied] = useState(false);
  const [hoveredContent, setHoveredContent] = useState(false);
  const [hoveredCopy, setHoveredCopy] = useState(false);

  const handleCopyContent = () => {
    navigator.clipboard.writeText(props.text);
    setCopied(true);
  };

  const handleMouseEnter = () => {
    setHoveredContent(true);
  };

  const handleMouseLeave = () => {
    setHoveredContent(false);
  };

  const handleMouseEnterCopy = () => {
    setHoveredCopy(true);
  };

  const handleMouseLeaveCopy = () => {
    setHoveredCopy(false);
  };

  const handleMouseLeaveCopied = () => {
    setHoveredCopy(false);
    const timeoutId = setTimeout(function () {
      setCopied(false);
    }, 500);
  };

  const shortText =
    props.text.slice(0, 5) +
    "..." +
    props.text.slice(props.text.length - 5, props.text.length);

  return (
    <span className={styles.AddressDiv}>
      <div className={styles.numberContainer}>
        <div className={styles.HoverDiv}>
          {hoveredContent && (
            <div className={styles.FullNumber}>
              <p className={styles.FullNumberP}>{props.text}</p>
            </div>
          )}

          {hoveredCopy && (
            <div className={styles.CopyBox}>
              {copied ? "Copied!" : "Copy Address"}
            </div>
          )}
        </div>
        <span className={styles.partialNumber}>
          <p onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {shortText}
          </p>
          {!copied && (
            <img
              src={copyIcon}
              className={styles.CopyIcon}
              onClick={handleCopyContent}
              onMouseEnter={handleMouseEnterCopy}
              onMouseLeave={handleMouseLeaveCopy}
            />
          )}
          {copied && (
            <img
              src={trueIcon}
              className={styles.CopyIcon2}
              onMouseLeave={handleMouseLeaveCopied}
            />
          )}
        </span>
      </div>
    </span>
  );
};

export default CustomTableItem;
