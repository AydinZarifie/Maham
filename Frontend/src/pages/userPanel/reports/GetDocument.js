import { useEffect, useState } from "react";
import styles from "../../../styles/reports.module.css";

const GetDocument = () => {
  const [data, setData] = useState([]);

  const getDocumentHandler = async (value) => {
    const formData = new FormData();
    formData.append("mintId", value);
    const response = await fetch("url", {
      method: "POST",
      body: formData,
    });
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
    <div className={styles.TableDiv2}>
      <table className={styles.InfoTable2}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Mint ID</th>
            <th>Country</th>
            <th>City</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr>
              <td>{item.title}</td>
              <td>{item.mint_id}</td>
              <td>{item.country_name}</td>
              <td>{item.city_name}</td>
              <td>
                <button
                  className={styles.GetDocumentBtn}
                  onClick={() => getDocumentHandler(item.mint_id)}
                >
                  get document
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetDocument;
