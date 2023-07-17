import styles from "../../../styles/AdminPanel.module.css";

import editLogo from "../../../images/edit-pencil-line-01-svgrepo-com.svg";
import deleteLogo from "../../../images/delete-1-svgrepo-com.svg";

const AdminItem = (props) => {
  return (
    <div className={styles.Profile}>
      <div className={styles.profileChildDiv}>
        {/* <img src={profileLogo} /> */}
        <svg
          width="64px"
          height="64px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.ProfileIcon2}
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />

          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <g id="SVGRepo_iconCarrier">
            <path
              d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z"
              stroke="#292D32"
              strokeWidth="0.768"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z"
              stroke="#292D32"
              strokeWidth="0.768"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="#292D32"
              strokeWidth="0.768"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
        <h5>{props.firstname + " " + props.lastname}</h5>
      </div>
      <h5>{props.admin_type}</h5>
      <h5>{props.admin_country}</h5>
      <h5>{props.admin_city}</h5>

      <div className={styles.profileChildDiv}>
        <button className={styles.EandDBtn}>
          <img src={editLogo} className={styles.ProfileIcon} />
        </button>
        <button className={styles.EandDBtn}>
          <img src={deleteLogo} className={styles.ProfileIcon} />
        </button>
      </div>
    </div>
  );
};

export default AdminItem;
