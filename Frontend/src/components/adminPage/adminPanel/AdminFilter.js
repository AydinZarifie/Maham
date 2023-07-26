import styles from "../../../styles/AdminPanel.module.css";

import { useState, React, forwardRef } from "react";

const AdminFilter = forwardRef((props, ref) => {
  const [filterData, setFilterData] = useState({
    name: "",
    type: "",
    country: "",
    city: "",
  });

  const eventHandler = (event) => {
    const { name, value } = event.target;
    setFilterData((prev) => ({ ...prev, [name]: value }));
    if (name == "name") {
      props.nameChangeFetchHandler(value);
    }
  };

  return (
    <>
      <div className={styles.FilterDiv}>
        <div className={styles.Filter} ref={ref}>
          <button className={styles.closeBtn} onClick={props.closeHandler}>
            &times;
          </button>

          <form className={styles.searchContainer}>
            <input
              type="text"
              name="name"
              value={filterData.name}
              onChange={eventHandler}
              className={`${styles.searchBox} ${styles.searchBar}`}
              placeholder="&#xF002;  |  search admin name"
            />
          </form>

          <div className={styles.wrapper}>
            <div className={styles.title}>Select Admin type</div>
            <div className={styles.box} onChange={eventHandler}>
              <input
                type="radio"
                name="type"
                value="SuperAdmin"
                id="option1"
                className={styles.option1}
              />
              <input
                type="radio"
                name="type"
                value="admin"
                id="option2"
                className={styles.option2}
              />
              <label htmlFor="option1" className={styles.option1}>
                <div className={styles.dot}></div>
                <div className={styles.text}>Super admin</div>
              </label>
              <label htmlFor="option2" className={styles.option2}>
                <div className={styles.dot}></div>
                <div className={styles.text}>Admin</div>
              </label>
            </div>
          </div>

          <div className={styles.floatingLabel}>
            <input
              className={styles.InputAdmin}
              placeholder="Country"
              type="text"
              name="country"
              value={filterData.country}
              onChange={eventHandler}
              id="country"
              required
            />
            <label className={styles.InputLabel} htmlFor="country">
              Country
            </label>
            <div className={styles.icon}>
              <svg
                height="64px"
                width="64px"
                version="1.1"
                id="_x32_"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  {/* <style type="text/css">
                    .st0 {
                      fill: #000000;
                    }
                  </style> */}
                  <g>
                    <path
                      // className="st0"
                      // style={{ fill: "#000000" }}
                      d="M454.111,193.473c-3.617,3.21-7.4,6.252-11.391,9.095c-9.236,6.546-14.26,10.143-17.404,12.866 c9.216,20.58,14.875,43.094,15.996,66.857h-66.418h-17.61h-92.449V170.384h-17.671h-70.307c2.769-6.606,5.732-12.886,8.915-18.731 c9.522-17.564,20.753-31.484,32.724-40.786c0.901-0.7,1.802-1.321,2.703-1.975c5.479-1.028,11.064-1.749,16.696-2.296 c-0.327-3.737-0.554-7.487-0.554-11.257c0-8.348,0.814-16.503,2.322-24.417c-54.439,3.977-103.533,27.693-139.848,64.022 c-39.939,39.919-64.702,95.252-64.689,156.184c-0.014,60.932,24.75,116.265,64.689,156.184 c39.912,39.939,95.245,64.703,156.184,64.689c60.939,0.014,116.266-24.75,156.184-64.689 c39.938-39.918,64.695-95.251,64.689-156.184C476.879,256.1,468.658,222.935,454.111,193.473z M124.813,159.941 c17.27-17.264,37.903-31.09,60.812-40.492c-10.918,14.133-20.213,31.404-27.76,50.936h-42.661 C118.287,166.794,121.463,163.284,124.813,159.941z M101.731,188.054h49.955c-8.708,28.134-13.86,60.165-14.634,94.238H70.688 C72.322,247.478,83.52,215.248,101.731,188.054z M94.504,382.422c-13.92-24.55-22.408-52.538-23.816-82.46h66.424 c0.674,29.435,4.624,57.275,11.317,82.46H94.504z M124.813,422.314c-6.886-6.887-13.2-14.334-18.938-22.221h47.833 c4.691,14.053,10.17,27.193,16.529,38.931c4.711,8.675,9.876,16.616,15.422,23.803 C162.737,453.424,142.097,439.584,124.813,422.314z M247.164,476.433c-8.835-0.414-17.496-1.475-25.958-3.07 c-0.908-0.654-1.808-1.274-2.71-1.968c-17.971-13.948-34.206-38.357-45.664-69.701c-0.186-0.52-0.353-1.081-0.547-1.602h74.879 V476.433z M247.164,382.422H166.68c-7-24.758-11.251-52.725-11.965-82.46h92.449V382.422z M247.164,282.292h-92.509 c0.814-34.54,6.453-66.744,15.568-94.238h76.94V282.292z M264.835,299.963h92.509c-0.701,29.729-4.985,57.702-11.985,82.46h-80.524 V299.963z M293.503,471.395c-0.894,0.694-1.802,1.314-2.71,1.968c-8.462,1.595-17.123,2.656-25.958,3.07v-76.34h74.898 c-3.964,11.044-8.488,21.28-13.506,30.509C316.705,448.165,305.474,462.079,293.503,471.395z M387.193,422.314 c-17.283,17.264-37.91,31.097-60.825,40.506c11.691-15.135,21.574-33.792,29.388-55.04c0.921-2.496,1.749-5.112,2.603-7.688h47.766 C400.385,407.98,394.073,415.427,387.193,422.314z M417.495,382.422H363.69c6.673-25.165,10.584-53.051,11.257-82.46h66.365 C439.904,329.885,431.409,357.872,417.495,382.422z"
                    />
                    <path
                      // className="st0"
                      // style={{ fill: "#000000" }}
                      d="M313.762,173.741c22.468,15.949,27.434,19.746,35.341,34.833c6.253,11.945,16.39,32.885,16.39,32.885 c0.48,0.954,1.448,1.562,2.522,1.562c1.061,0,2.049-0.608,2.522-1.562c0,0,10.143-20.94,16.396-32.885 c7.894-15.088,12.866-18.884,35.341-34.833c24.63-17.47,41.086-45.911,41.086-78.402C463.359,42.688,420.665,0,368.014,0 c-52.658,0-95.332,42.688-95.332,95.339C272.682,127.83,289.125,156.27,313.762,173.741z M368.014,55.013 c22.275,0,40.332,18.058,40.332,40.326c0,22.274-18.057,40.332-40.332,40.332c-22.275,0-40.326-18.058-40.326-40.332 C327.689,73.071,345.739,55.013,368.014,55.013z"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </div>

          <div className={styles.floatingLabel}>
            <input
              className={styles.InputAdmin}
              placeholder="City"
              type="text"
              name="city"
              value={filterData.city}
              onChange={eventHandler}
              id="city"
              required
            />
            <label className={styles.InputLabel} htmlFor="city">
              City
            </label>
            <div className={styles.icon}>
              {/* <img src={cityLogo} /> */}
              <svg
                width="64px"
                height="64px"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                stroke="#000000"
                strokeWidth="1.248"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  <defs>
                    {/* <style>
                      .a {
                        fill: none;
                        stroke: #000000;
                        strokeLinecap: round;
                        strokeLinejoin: round;
                      }
                    </style> */}
                  </defs>

                  <path
                    // className="a"
                    // style={{
                    //   fill: "none",
                    //   stroke: "#000000",
                    //   strokeLinecap: "round",
                    //   strokeLinejoin: "round",
                    // }}
                    d="M27.5944,5.5948a9.0331,9.0331,0,0,0-9.0331,9.0331c0,7.0693,6.8966,15.5761,8.7032,17.6655a.5577.5577,0,0,0,.7855.055l.0549-.055c1.7831-2.0973,8.5226-10.5962,8.5226-17.6655A9.0331,9.0331,0,0,0,27.5944,5.5948Zm0,12.8548a4.4344,4.4344,0,1,1,4.4344-4.4344v.0113A4.4344,4.4344,0,0,1,27.5944,18.45Z"
                  />

                  <polyline
                    // className="a"
                    style={{
                      fill: "none",
                      stroke: "#000000",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                    }}
                    points="36.454 16.678 37.629 16.598 42.5 40.607 32.376 42.405 16.461 40.723 5.5 42.405 8.458 17.758 17.447 16.598 18.736 16.662"
                  />

                  <line
                    // className="a"
                    // style={{
                    //   fill: "none",
                    //   stroke: "#000000",
                    //   strokeLinecap: "round",
                    //   strokeLinejoin: "round",
                    // }}
                    x1="17.4467"
                    y1="16.598"
                    x2="16.8049"
                    y2="40.7598"
                  />

                  <line
                    // className="a"
                    // style={{
                    //   fill: "none",
                    //   stroke: "#000000",
                    //   strokeLinecap: "round",
                    //   strokeLinejoin: "round",
                    // }}
                    x1="32.3758"
                    y1="42.4052"
                    x2="30.6655"
                    y2="28.982"
                  />
                </g>
              </svg>
            </div>
          </div>

          <button
            className={styles.FilterBtn}
            type="submit"
            onClick={() =>
              props.submitHandler(
                filterData.name,
                filterData.type,
                filterData.country,
                filterData.city
              )
            }
          >
            Filter
          </button>
        </div>
        <button className={styles.FilterBtn2} onClick={props.openHandler}>
          filter
        </button>
      </div>
    </>
  );
});

export default AdminFilter;
