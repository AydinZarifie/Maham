import styles from "../../styles/GuidePage.module.css"


import leftArrowIcon from "../../images/arrow-sm-left-black-svgrepo-com.svg";
import screenshotIcon from "../../images/Screenshot (127).png";

const GuideHomePage=()=>{
    return(
        <div className={styles.Main}>
        <div className={styles.Row}>
          <h3>Home page</h3>
          <p>
            Lorem Iom is easy-to-produce fake text from the printing industry
            using graphic designers. Printers and texts, but newspapers and in
            their columns and rows are necessary and for the current conditions
            of the technology required and diverse applications with the aim of
            improving practical tools. Many books in sixty-three percent of the
            past, present and future require the knowledge of society and
            experts to create more software for computer designers, especially
            creative designers and leading culture in Persian language. In this
            case, we can hope that all the existing problems in providing
            solutions and difficult typing conditions will end and the time
            required for basic typesetting and answering the continuous
            questions of the existing world of basic design will be used.
          </p>
        </div>
        <video className={styles.Video} controls>
          <source src="" type="video/mp4" />
        </video>

        <div className={styles.Row}>
          <h3>Menu</h3>
          <p>
            Lorem Iom is easy-to-produce fake text from the printing industry
            using graphic designers. Printers and texts, but newspapers and in
            their columns and rows are necessary and for the current conditions
            of the technology required and diverse applications with the aim of
            improving practical tools. Many books in sixty-three percent of the
            past, present and future require the knowledge of society and
            experts .
          </p>
          <div className={styles.ImageDiv}>
            <img className={styles.SectionPageImg} src={screenshotIcon} />
          </div>
        </div>
        <div className={styles.HelpDiv}>
          <h4>Does this article help ?</h4>

          <div className={styles.BottonDiv}>
            <button>Yes</button>
            <button>No</button>
          </div>
        </div>
        <div className={styles.NextAndPreviousDiv}>
          <div className={styles.NPInsideDiv}>
            <img src={leftArrowIcon} className={styles.PreviousImg} />
            Previous
          </div>
          <h5>. . .</h5>
          <div className={styles.NPInsideDiv}>
            Next
            <img src={leftArrowIcon} className={styles.NextImg} />
          </div>
        </div>
      </div>
    )
}

export default GuideHomePage;