import styles from "../../styles/customTableItem.module.css";

import copyIcon from "../../images/copy-documents-duplicate-svgrepo-com.svg";
import trueIcon from "../../images/tick-svgrepo-com_2.svg";
import { useRef, useState } from "react";

const CustomTableItem = (props) => {
  const [copied, setCopied] = useState(false);
  const [hoveredContent, setHoveredContent] = useState(false);
  const [hoveredCopy, setHoveredCopy] = useState(false);
  // const hoveredContent = useRef(null);
  // const hoveredCopy = useRef(null);

  const handleCopyContent = () => {
    navigator.clipboard.writeText(props.text);
    setCopied(true);
  };

  const handleMouseEnter = () => {
    // hoveredContent.current.style.opacity = "1";
    setHoveredContent(true);
  };

  const handleMouseLeave = () => {
    // hoveredContent.current.style.opacity = "0";
    setHoveredContent(false);
  };

  const handleMouseEnterCopy = () => {
    // hoveredCopy.current.style.opacity = "1";
    setHoveredCopy(true);
  };

  const handleMouseLeaveCopy = () => {
    // hoveredCopy.current.style.opacity = "0";
    setHoveredCopy(false);
  };

  const handleMouseLeaveCopied = () => {
    // hoveredCopy.current.style.opacity = "0";
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
