import {  useRef,forwardRef, useImperativeHandle } from "react";
import styles from "../../styles/GuidePage.module.css";

import arrowDownIcon from "../../images/arrow-down-svgrepo-com.svg";

const MenuOption = forwardRef((props, ref) => {
  //props=> name img children size mainChildren=[{name img children size}]
  const InsideOptionRef = useRef();
  const arrowIconRef = useRef();
  const MenuOptionRef = useRef();

  const SideMenuId = document.getElementById("SideMenuId");

  const toggleMenu = () => {
    console.log( SideMenuId );
    if ( arrowIconRef.current.style.rotate != "180deg" ) {
      InsideOptionRef.current.style.minHeight = props.size+"px";
      InsideOptionRef.current.style.maxnHeight = props.size+"px";
      InsideOptionRef.current.style.borderBottom = "1px solid rgb(247, 247, 247)";
      arrowIconRef.current.style.rotate = "180deg";
      MenuOptionRef.current.style.backgroundColor = " rgb(250, 250, 250)";
    } else {
      InsideOptionRef.current.style.minHeight = "0px";
      InsideOptionRef.current.style.maxHeight = "0px";
      InsideOptionRef.current.style.borderBottom = "0px solid rgb(247, 247, 247)";
      arrowIconRef.current.style.rotate = "0deg";
      MenuOptionRef.current.style.backgroundColor = "#fff";
    }
  };

  useImperativeHandle(ref, () => ({
    closeMenu,
  }));

 const closeMenu =()=>{
    InsideOptionRef.current.style.minHeight = "0px";
    InsideOptionRef.current.style.maxHeight = "0px";
    InsideOptionRef.current.style.borderBottom = "0px solid rgb(247, 247, 247)";
    arrowIconRef.current.style.rotate = "0deg";
    MenuOptionRef.current.style.backgroundColor = "#fff";
  }

  return (
    <>
      <div
        className={styles.MenuOption}
        onClick={toggleMenu}
        ref={MenuOptionRef}
      >
        <span>
          <div className={styles.LeftLine}></div>
          <img src={props.img} className={styles.MenuIcon} />
          <h4>{props.name}</h4>
        </span>
        <img
          src={arrowDownIcon}
          className={styles.arrowIcon}
          ref={arrowIconRef}
        />
      </div>

      <div className={styles.InsideOption} ref={InsideOptionRef}>
        {props.children &&
          props.children.map((item) => (
            <div
              className={styles.MenuOption}
              // onClick="ClickOption2()"
            >
              <span>
                <div className={styles.LeftLine}></div>

                <h4 className={styles.OptionH42}>- {item}</h4>
              </span>
            </div>
          ))}
          {props.mainChildren &&
          props.mainChildren.map((item) => (
            <MenuOption name={item.name} img={item.img} children={item.children} size={item.size} />
          ))}
      </div>
    </>
  );
});

export default MenuOption;
