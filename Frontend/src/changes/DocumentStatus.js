import styles from "../../../styles/reports.module.css";
import profileIcon from "../../../images/profile-circle-svgrepo-com.svg";
import deleteIcon from "../../../images/delete-2-svgrepo-com2.svg";
import messageIcon from "../../../images/message-square-arrow-down-svgrepo-com.svg";
import { useEffect, useRef, useState } from "react";
import ProfileModal from "../../../components/adminPage/AdminEstate/ProfileModal";

const DocumentStatus = () => {
  const [data, setData] = useState([
    {
      title: "beach home",
      mint_id: 234324,
      country_name: "iran",
      city_name: "tabriz",
      status: "rejected",
      message: "hello i am good how are you ?!",
    },
    {
      title: "beach home",
      mint_id: 234324,
      country_name: "iran",
      city_name: "tabriz",
      status: "pending",
    },
    {
      title: "beach home",
      mint_id: 234324,
      country_name: "iran",
      city_name: "tabriz",
      status: "accepted",
    },
    {
      title: "beach home",
      mint_id: 234324,
      country_name: "iran",
      city_name: "tabriz",
      status: "rejected",
      message: "hello i am good how are you ?!",
    },
  ]);

  const [profile, setProfile] = useState(false);

  const openProfile =async (value) => {
    // const formData = new FormData();
    // formData.append("mintId", value);
    // const response = await fetch("url", {
    //   method: "POST",
    //   body: formData,
    // });
    setProfile(true);
  };

  const messageRef = useRef([]);

  const toggleMessage = (index) => {
    if (messageRef.current[index].style.maxHeight != "45px") {
      messageRef.current[index].style.maxHeight = "45px";
    } else {
      messageRef.current[index].style.maxHeight = "0px";
    }
  };

  const cancelHandler = async (value) => {
    const formData = new FormData();
    formData.append("mintId", value);
    const response = await fetch("url", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      window.location.reload(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("url");
      const data = await response.json();
      setData(data.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.TableDiv2}>
        <table className={styles.InfoTable2}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Mint ID</th>
              <th>Country</th>
              <th>City</th>
              <th>Status</th>
              <th>Information</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <>
                <tr>
                  <td>{item.title}</td>
                  <td>{item.mint_id}</td>
                  <td>{item.country_name}</td>
                  <td>{item.city_name}</td>
                  <td>
                    {item.status == "accepted" && (
                      <div className={styles.acceptDiv}>accepted</div>
                    )}
                    {item.status == "rejected" && (
                      <div className={styles.rejectDiv}>rejected</div>
                    )}
                    {item.status == "pending" && (
                      <div className={styles.pendingDiv}>pending</div>
                    )}
                  </td>
                  <td>
                    {item.status == "accepted" && (
                      <img
                        className={styles.infoIcon}
                        src={profileIcon}
                        onClick={openProfile}
                      />
                    )}
                    {(item.status == "pending" ||
                      item.status == "rejected") && (
                      <div className={styles.EspDiv}>
                        <img
                          className={styles.infoIcon}
                          src={profileIcon}
                          onClick={openProfile}
                        />
                        {item.status == "pending" && (
                          <img
                            src={deleteIcon}
                            className={styles.deleteIcon}
                            onClick={() => cancelHandler(item.mint_id)}
                          />
                        )}
                        {item.status == "rejected" && (
                          <img
                            src={messageIcon}
                            className={styles.deleteIcon}
                            onClick={() => toggleMessage(index)}
                          />
                        )}
                      </div>
                    )}
                  </td>
                </tr>

                {item.status == "rejected" && (
                  <tr class={styles.alertRow}>
                    <td
                      colspan="7"
                      style={{ padding: "0px", border: "none" }}
                      className={styles.AlertTd}
                    >
                      <div
                        className={styles.AlertDiv}
                        ref={(element) => (messageRef.current[index] = element)}
                      >
                        <p>{item.message}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
      {profile && <ProfileModal toggleShowProfile={() => setProfile(false)} />}
    </>
  );
};

export default DocumentStatus;
