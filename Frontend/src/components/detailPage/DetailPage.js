import Accessibility from "./Accessibility";
import Facilities from "./Facilities";
import Gallery from "./Gallery";
import Headline from "./Headline";
import Metrage from "./Metrage";
import Navbar from "../Navbar";

import styles from "../../styles/Details.module.css";
import {  json } from "react-router-dom";

const DetailPage = () => {
  return (
    <>
      <Navbar />
      <div id="Photos">
        <Headline />
        <Gallery />
        {/* <br /><br /><br /><br /><br /><br /><br /><br /> */}
        <Metrage />
        {/* <br /><br /><br /><br /><br /><br /><br /><br /> */}
        <Accessibility />
        <Facilities />
        <br />
        <br />
        <div className={styles.Location} id="Location">
          <div>
            <div className={styles.Locationh3Div}>
              <h3>Location</h3>
            </div>
            <div className={styles.GoogleMapDiv}>
              {/* <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13814375.740282936!2d53.683015749999996!3d32.29437795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfa!2s!4v1680512826169!5m2!1sfa!2s"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe> */}
            </div>
          </div>
          <div className={styles.DetailsButtonDiv}></div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;

async function loadEstate(id) {
  const response = await fetch("http://localhost:8080/estates/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

export async function loader({ request, params }) {
  const id = params.eventId;

  return loadEstate(id);
}
