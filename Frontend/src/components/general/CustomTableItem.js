import styles from "../../styles/customTableItem.module.css";

import copyIcon from "../../images/copy-documents-duplicate-svgrepo-com.svg";
import trueIcon from "../../images/tick-svgrepo-com_2.svg";
import { useRef, useState } from "react";

const CustomTableItem = (props) => {
  const [copied, setCopied] = useState(false);
  const contentRef = useRef(null);
  const hoveredContent = useRef(null);
  const hoveredCopy = useRef(null);

  const handleCopyContent = () => {
    const contentToCopy = contentRef.current.textContent;
    navigator.clipboard.writeText(contentToCopy);
    setCopied(true);
  };

  const handleMouseEnter = () => {
    hoveredContent.current.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    hoveredContent.current.style.opacity = "0";
  };

  const handleMouseEnterCopy = () => {
    hoveredCopy.current.style.opacity = "1";
  };

  const handleMouseLeaveCopy = () => {
    hoveredCopy.current.style.opacity = "0";
  };

  const handleMouseLeaveCopied = () => {
    hoveredCopy.current.style.opacity = "0";
    const timeoutId = setTimeout(function () {
      setCopied(false);
    }, 500);
  };

  return (
    <span className={styles.AddressDiv}>
      <div
        className={styles.numberContainer}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.FullNumber} ref={hoveredContent}>
          <p ref={contentRef} className={styles.FullNumberP}>
            {props.text}
          </p>
        </div>

        <span className={styles.partialNumber}>0X123...345</span>
      </div>
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
          // onMouseEnter="Visible3()"
          onMouseLeave={handleMouseLeaveCopied}
        />
      )}

      <div ref={hoveredCopy} className={styles.CopyBox}>
        {copied ? "Copied!" : "Copy Address"}
      </div>
    </span>
  );
};

export default CustomTableItem;
