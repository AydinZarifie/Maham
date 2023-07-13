import styles from "../../../styles/adminEstates.module.css";

import img from "../../../images/4918.jpg"

const SellPosition = () => {
  return (
    <div class={styles.Sell}>
      <table cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th></th>
            <th></th>
            <th>Country</th>
            <th>City</th>
            <th>Sell position</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src={img} className={styles.EstateImg} />
            </td>
            <td>Beach home in ohaio 867</td>
            <td></td>
            <td></td>
            <td>Iran</td>
            <td>Tabriz</td>

            <td>
              true
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SellPosition;
