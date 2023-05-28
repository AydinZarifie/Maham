import styles from "../../styles/Add_Estate.module.css";

import balconyIcon from "../../images/balcony-svgrepo-com.svg";
import bathroomIcon from "../../images/bathroom-svgrepo-com.svg";
import bbqIcon from "../../images/bbq-svgrepo-com.svg";
import bedIcon from "../../images/bed-bedroom-furniture-hotel-sleep-svgrepo-com.svg";
import diningroomIcon from "../../images/dining-room-svgrepo-com.svg";
import elevatorIcon from "../../images/elevator-1-svgrepo-com.svg";
import furintureIcon from "../../images/furniture-svgrepo-com.svg";
import garageIcon from "../../images/garage-svgrepo-com.svg";
import gardenIcon from "../../images/garden-planting-flower-svgrepo-com.svg";
import guestIcon from "../../images/guest-svgrepo-com.svg";
import gymIcon from "../../images/gym-workout-svgrepo-com.svg";
import kitchenIcon from "../../images/kitchen-room-svgrepo-com.svg";
import laundryIcon from "../../images/laundry-svgrepo-com.svg";
import livingroomIcon from "../../images/livingroom-svgrepo-com.svg";
import parkingIcon from "../../images/parking-svgrepo-com.svg";
import poolIcon from "../../images/pool-svgrepo-com.svg";
import uploadIcon from "../../images/upload-filled-svgrepo-com.svg";
import wifiIcon from "../../images/wifi-medium-svgrepo-com.svg";
import woodenFenceIcon from "../../images/wooden-fence-svgrepo-com.svg";
import { Form, json, redirect, useSubmit } from "react-router-dom";
import { useState } from "react";

const ConfingEstate = ({ method, estate }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const [bedroom, setBedroom] = useState({
    checked: estate ? estate.bedroom.checked : false,
    number: estate ? estate.bedroom.number : "",
    metrage: estate ? estate.bedroom.metrage : "",
  });
  const [livingRoom, setLivingroom] = useState({
    checked: estate ? estate.livingRoom.checked : false,
    number: estate ? estate.livingRoom.number : "",
    metrage: estate ? estate.livingRoom.metrage : "",
  });
  const [kitchen, setKitchen] = useState({
    checked: estate ? estate.kitchen.checked : false,
    number: estate ? estate.kitchen.number : "",
    metrage: estate ? estate.kitchen.metrage : "",
  });
  const [diningroom, setDiningroom] = useState({
    checked: estate ? estate.diningroom.checked : false,
    number: estate ? estate.diningroom.number : "",
    metrage: estate ? estate.diningroom.metrage : "",
  });
  const [guestroom, setGuestroom] = useState({
    checked: estate ? estate.guestroom.checked : false,
    number: estate ? estate.guestroom.number : "",
    metrage: estate ? estate.guestroom.metrage : "",
  });
  const [bathroom, setBathroom] = useState({
    checked: estate ? estate.bathroom.checked : false,
    number: estate ? estate.bathroom.number : "",
    metrage: estate ? estate.bathroom.metrage : "",
  });
  const [garden, setGarden] = useState({
    checked: estate ? estate.garden.checked : false,
    number: estate ? estate.garden.number : "",
    metrage: estate ? estate.garden.metrage : "",
  });
  const [balcony, setBalcony] = useState({
    checked: estate ? estate.balcony.checked : false,
    number: estate ? estate.balcony.number : "",
    metrage: estate ? estate.balcony.metrage : "",
  });
  const [garage, setGarage] = useState({
    checked: estate ? estate.garage.checked : false,
    number: estate ? estate.garage.number : "",
    metrage: estate ? estate.garage.metrage : "",
  });
  const [facilities, setfacilities] = useState({
    wifi: estate ? estate.facilities.wifi : false,
    parking: estate ? estate.facilities.parking : false,
    pool: estate ? estate.facilities.pool : false,
    furniture: estate ? estate.facilities.furniture : false,
    elevator: estate ? estate.facilities.elevator : false,
    garden: estate ? estate.facilities.garden : false,
    laundary: estate ? estate.facilities.laundary : false,
    bbq: estate ? estate.facilities.bbq : false,
    gym: estate ? estate.facilities.gym : false,
  });
  const [information, setInformation] = useState({
    title: estate ? estate.title : "",
    countryName: estate ? estate.country : "",
    cityName: estate ? estate.city : "",
    streetName: estate ? estate.streetName : "",
    plate: estate ? estate.plate : "",
    numberOfPlate: estate ? estate.plateNumber : "",
    numberOfFloor: estate ? estate.floorNumber : "",
    numberOfUnit: estate ? estate.unit : "",
    location: estate ? estate.location : "",

    type: estate ? estate.type : "",

    description: estate ? estate.description : "",
  });

  function basicEventHandler(event) {
    const { name, value } = event.target;
    setInformation((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function bedroomEventHandler(event) {
    const { name, value } = event.target;
    setBedroom((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function livingRoomEventHandler(event) {
    const { name, value } = event.target;
    setLivingroom((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function kitchenEventHandler(event) {
    const { name, value } = event.target;
    setKitchen((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function diningroomEventHandler(event) {
    const { name, value } = event.target;
    setDiningroom((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function guestroomEventHandler(event) {
    const { name, value } = event.target;
    setGuestroom((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function bathroomEventHandler(event) {
    const { name, value } = event.target;
    setBathroom((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function gardenEventHandler(event) {
    const { name, value } = event.target;
    setGarden((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function balconyEventHandler(event) {
    const { name, value } = event.target;
    setBalcony((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function garageEventHandler(event) {
    const { name, value } = event.target;
    setGarage((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function facilitiesEventHandler(event) {
    const { name, value } = event.target;
    setfacilities((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const imgHandler = (event) => {
    // const files = event.target.files;
    // const previews = [];

    // for (let i = 0; i < files.length; i++) {
    //   const file = files[i];
    //   const reader = new FileReader();

    //   reader.onload = () => {
    //     previews.push(reader.result);
    //     if (previews.length == files.length) {
    //       setPreviewImages(previews);
    //     }
    //   };
    //   reader.readAsDataURL(file);
    // }
    // setSelectedImages(files);
    // console.log(previewImages);

    //======================

    // const files = event.target.files;
    // const selectedImagesArray = [];
    // for (let i = 0; i < files.length; i++) {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(files[i]);
    //   reader.onloadend = () => {
    //     selectedImagesArray.push(reader.result);
    //     setSelectedImages(selectedImagesArray);
    //   };
    // }
    // console.log(selectedImages);

    //=========================
    const selectedFiles = Array.from(event.target.files);
    setSelectedImages(selectedFiles);

    const previewURLs = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages(previewURLs);
  };

  const submitHandler = async (event) => {
    console.log("hello");
    // event.preventDefault();

    const formData = new FormData();

    formData.append("title", information.title);
    formData.append("cityName", information.cityName);
    formData.append("countryName", information.countryName);
    formData.append("streetName", information.streetName);
    formData.append("plate", information.plate);
    formData.append("numberOfPlate", information.numberOfPlate);
    formData.append("numberOfFloor", information.numberOfFloor);
    formData.append("location", information.location);

    formData.append("type", information.type);

    formData.append("checkBedroom", bedroom.checked);
    formData.append("numberBedroom", bedroom.number);
    formData.append("metrageBedroom", bedroom.metrage);

    formData.append("checkLivingRoom", livingRoom.checked);
    formData.append("numberLivingRoom", livingRoom.number);
    formData.append("metrageLivingRoom", livingRoom.metrage);

    formData.append("checkKitchen", kitchen.checked);
    formData.append("numberKitchen", kitchen.number);
    formData.append("metrageKitchen", kitchen.metrage);

    formData.append("checkDiningroom", diningroom.checked);
    formData.append("numberDiningroom", diningroom.number);
    formData.append("metrageDiningroom", diningroom.metrage);

    formData.append("checkGuestroom", guestroom.checked);
    formData.append("numberGuestroom", guestroom.number);
    formData.append("metrageGuestroom", guestroom.metrage);

    formData.append("checkBathroom", bathroom.checked);
    formData.append("numberBathroom", bathroom.number);
    formData.append("metrageBathroom", bathroom.metrage);

    formData.append("checkGarden", garden.checked);
    formData.append("numberGarden", garden.number);
    formData.append("metrageGarden", garden.metrage);

    formData.append("checkBalcony", balcony.checked);
    formData.append("numberBalcony", balcony.number);
    formData.append("metrageBalcony", balcony.metrage);

    formData.append("checkGarage", garage.checked);
    formData.append("numberGarage", garage.number);
    formData.append("metrageGarage", garage.metrage);

    formData.append("checkWifi", facilities.wifi);
    formData.append("checkParking", facilities.parking);
    formData.append("checkPool", facilities.pool);
    formData.append("checkFurniture", facilities.furniture);
    formData.append("checkElevator", facilities.elevator);
    formData.append("checkGarden", facilities.garden);
    formData.append("checkLaundary", facilities.laundary);
    formData.append("checkBbq", facilities.bbq);
    formData.append("checkGym", facilities.gym);

    formData.append("description", information.description);

    selectedImages.forEach((file) => {
      formData.append("images", file);
    });

    let url = "url";

    if (method === "PATCH") {
      const estateId = estate.id;
      url = "url" + estateId;
    }

    const response = await fetch(url, {
      method: method,
      body: formData,
    });

    return redirect("/admin/estates");
  };

  return (
    <form method={method}>
      <div className={styles.EstateInfo}>
        <div className={styles.wrapper}>
          <div className={styles.inputData}>
            <input
              type="text"
              className={styles.textinput}
              //required
              value={information.title}
              name="title"
              onChange={basicEventHandler}
            />
            <div className={styles.underline}></div>
            <label className={styles.label}>Title</label>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column2}>
            <div>
              <label>Country</label>
            </div>
            <div className={styles.select}>
              <select
                value={information.countryName}
                onChange={basicEventHandler}
                name="countryName"
              >
                <option value="Iran">Iran</option>
                <option value="United State">United State</option>
                <option value="Turkey">Turkey</option>
              </select>
            </div>
          </div>
          <div className={styles.column2}>
            <div>
              <label>City</label>
            </div>
            <div className={styles.select}>
              <select
                value={information.cityName}
                onChange={basicEventHandler}
                name="cityName"
              >
                <option value="Tabriz">Tabriz</option>
                <option value="Tehran">Tehran</option>
                <option value="Esfahan">Esfahan</option>
              </select>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.wrapper2}>
              <div className={styles.inputData}>
                <input
                  type="text"
                  className={styles.textinput}
                  //required
                  value={information.streetName}
                  onChange={basicEventHandler}
                  name="streetName"
                />
                <div className={styles.underline}></div>
                <label className={styles.label}>Street Name</label>
              </div>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.wrapper2}>
              <div className={styles.inputData}>
                <input
                  type="text"
                  className={styles.textinput}
                  //required
                  value={information.plate}
                  onChange={basicEventHandler}
                  name="plate"
                />
                <div className={styles.underline}></div>
                <label className={styles.label}>Plates</label>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.wrapper2}>
              <div className={styles.inputData}>
                <input
                  type="text"
                  className={styles.textinput}
                  //required
                  value={information.numberOfPlate}
                  name="numberOfPlate"
                  onChange={basicEventHandler}
                />
                <div className={styles.underline}></div>
                <label className={styles.label}>Number Of Plates</label>
              </div>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.wrapper2}>
              <div className={styles.inputData}>
                <input
                  type="text"
                  className={styles.textinput}
                  //required
                  value={information.numberOfFloor}
                  onChange={basicEventHandler}
                  name="numberOfFloor"
                />
                <div className={styles.underline}></div>
                <label className={styles.label}>Number Of Floors</label>
              </div>
            </div>
            <div className={styles.wrapper2}>
              <div className={styles.inputData}>
                <input
                  type="text"
                  className={styles.textinput}
                  //required
                  value={information.numberOfUnit}
                  onChange={basicEventHandler}
                  name="numberOfUnit"
                />
                <div className={styles.underline}></div>
                <label className={styles.label}>Number Of Unit</label>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.inputData}>
            <input
              type="text"
              className={styles.textinput}
              // //required
              value={information.location}
              onChange={basicEventHandler}
              name="location"
            />
            <div className={styles.underline}></div>
            <label className={styles.label}>Location Of State</label>
          </div>
        </div>
      </div>

      <div className={styles.select2}>
        <select
          value={information.type}
          onChange={basicEventHandler}
          name="type"
        >
          <option value="residential">residential</option>
          <option value="commercial">commercial</option>
        </select>
      </div>

      <div className={styles.RoomAndMetarge}>
        <h3>Romms And Metrages</h3>

        <div className={styles.Row3}>
          <table className={styles.styledTable}>
            <tbody>
              <tr>
                <td>
                  <div className={styles.checkbox_wrapper}>
                    <input
                      type="checkbox"
                      id="check1"
                      name="checked"
                      value={bedroom.checked}
                      onChange={bedroomEventHandler}
                    />
                    <label htmlFor="check1">
                      <span></span>
                    </label>
                  </div>
                </td>
                <td>
                  <img src={bedIcon} className={styles.Icons} />
                </td>
                <td>BedRoom</td>
                <td>
                  <label htmlFor="Number">Number:</label>
                  <input
                    type="number"
                    name="number"
                    min="0"
                    id="Number"
                    className={styles.Inputs}
                    value={bedroom.number}
                    onChange={bedroomEventHandler}
                  />
                </td>
                <td>
                  <label htmlFor="Metrage">Metrage:</label>
                  <input
                    type="number"
                    name="metrage"
                    min="0"
                    id="Metrage"
                    className={styles.Inputs}
                    value={bedroom.metrage}
                    onChange={bedroomEventHandler}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.checkbox_wrapper}>
                    <input
                      type="checkbox"
                      id="check2"
                      name="checked"
                      value={livingRoom.checked}
                      onChange={livingRoomEventHandler}
                    />
                    <label htmlFor="check2">
                      <span></span>
                    </label>
                  </div>
                </td>
                <td>
                  <img src={livingroomIcon} className={styles.Icons} />
                </td>
                <td>LivingRoom</td>
                <td>
                  <label htmlFor="Number">Number:</label>
                  <input
                    type="number"
                    name="number"
                    min="0"
                    id="Number"
                    className={styles.Inputs}
                    value={livingRoom.number}
                    onChange={livingRoomEventHandler}
                  />
                </td>
                <td>
                  <label htmlFor="Metrage">Metrage:</label>
                  <input
                    type="number"
                    name="metrage"
                    min="0"
                    id="Metrage"
                    className={styles.Inputs}
                    value={livingRoom.metrage}
                    onChange={livingRoomEventHandler}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.checkbox_wrapper}>
                    <input
                      type="checkbox"
                      id="check3"
                      name="checked"
                      value={kitchen.checked}
                      onChange={kitchenEventHandler}
                    />
                    <label htmlFor="check3">
                      <span></span>
                    </label>
                  </div>
                </td>
                <td>
                  <img src={kitchenIcon} className={styles.Icons} />
                </td>
                <td>Kitchen</td>
                <td>
                  <label htmlFor="Number">Number:</label>
                  <input
                    type="number"
                    name="number"
                    min="0"
                    id="Number"
                    className={styles.Inputs}
                    value={kitchen.number}
                    onChange={kitchenEventHandler}
                  />
                </td>
                <td>
                  <label htmlFor="Metrage">Metrage:</label>
                  <input
                    type="number"
                    name="metrage"
                    min="0"
                    id="Metrage"
                    className={styles.Inputs}
                    value={kitchen.metrage}
                    onChange={kitchenEventHandler}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.checkbox_wrapper}>
                    <input
                      type="checkbox"
                      id="check4"
                      name="checked"
                      value={diningroom.checked}
                      onChange={diningroomEventHandler}
                    />
                    <label htmlFor="check4">
                      <span></span>
                    </label>
                  </div>
                </td>
                <td>
                  <img src={diningroomIcon} className={styles.Icons} />
                </td>
                <td>DiningRoom</td>
                <td>
                  <label htmlFor="Number">Number:</label>
                  <input
                    type="number"
                    name="number"
                    min="0"
                    id="Number"
                    className={styles.Inputs}
                    value={diningroom.number}
                    onChange={diningroomEventHandler}
                  />
                </td>
                <td>
                  <label htmlFor="Metrage">Metrage:</label>
                  <input
                    type="number"
                    name="metrage"
                    min="0"
                    id="Metrage"
                    className={styles.Inputs}
                    value={diningroom.metrage}
                    onChange={diningroomEventHandler}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.checkbox_wrapper}>
                    <input
                      type="checkbox"
                      id="check5"
                      name="checked"
                      value={guestroom.checked}
                      onChange={guestroomEventHandler}
                    />
                    <label htmlFor="check5">
                      <span></span>
                    </label>
                  </div>
                </td>
                <td>
                  <img src={guestIcon} className={styles.Icons} />
                </td>
                <td>GuestRoom</td>
                <td>
                  <label htmlFor="Number">Number:</label>
                  <input
                    type="number"
                    name="number"
                    min="0"
                    id="Number"
                    className={styles.Inputs}
                    value={guestroom.number}
                    onChange={guestroomEventHandler}
                  />
                </td>
                <td>
                  <label htmlFor="Metrage">Metrage:</label>
                  <input
                    type="number"
                    name="metrage"
                    min="0"
                    id="Metrage"
                    className={styles.Inputs}
                    value={guestroom.metrage}
                    onChange={guestroomEventHandler}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.checkbox_wrapper}>
                    <input
                      type="checkbox"
                      id="check6"
                      name="checked"
                      value={bathroom.checked}
                      onChange={bathroomEventHandler}
                    />
                    <label htmlFor="check6">
                      <span></span>
                    </label>
                  </div>
                </td>
                <td>
                  <img src={bathroomIcon} className={styles.Icons} />
                </td>
                <td>BathRoom</td>
                <td>
                  <label htmlFor="Number">Number:</label>
                  <input
                    type="number"
                    name="number"
                    min="0"
                    id="Number"
                    className={styles.Inputs}
                    value={bathroom.number}
                    onChange={bathroomEventHandler}
                  />
                </td>
                <td>
                  <label htmlFor="Metrage">Metrage:</label>
                  <input
                    type="number"
                    name="metrage"
                    min="0"
                    id="Metrage"
                    className={styles.Inputs}
                    value={bathroom.metrage}
                    onChange={bathroomEventHandler}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.checkbox_wrapper}>
                    <input
                      type="checkbox"
                      id="check7"
                      name="checked"
                      value={garden.checked}
                      onChange={gardenEventHandler}
                    />
                    <label htmlFor="check7">
                      <span></span>
                    </label>
                  </div>
                </td>
                <td>
                  <img src={gardenIcon} className={styles.Icons} />
                </td>
                <td>Garden</td>
                <td>
                  <label htmlFor="Number">Number:</label>
                  <input
                    type="number"
                    name="number"
                    min="0"
                    id="Number"
                    className={styles.Inputs}
                    value={garden.number}
                    onChange={gardenEventHandler}
                  />
                </td>
                <td>
                  <label htmlFor="Metrage">Metrage:</label>
                  <input
                    type="number"
                    name="metrage"
                    min="0"
                    id="Metrage"
                    className={styles.Inputs}
                    value={garden.metrage}
                    onChange={gardenEventHandler}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.checkbox_wrapper}>
                    <input
                      type="checkbox"
                      id="check8"
                      name="checked"
                      value={balcony.checked}
                      onChange={balconyEventHandler}
                    />
                    <label htmlFor="check8">
                      <span></span>
                    </label>
                  </div>
                </td>
                <td>
                  <img src={balconyIcon} className={styles.Icons} />
                </td>
                <td>Balcony</td>
                <td>
                  <label htmlFor="Number">Number:</label>
                  <input
                    type="number"
                    name="number"
                    min="0"
                    id="Number"
                    className={styles.Inputs}
                    value={balcony.number}
                    onChange={balconyEventHandler}
                  />
                </td>
                <td>
                  <label htmlFor="Metrage">Metrage:</label>
                  <input
                    type="number"
                    name="metrage"
                    min="0"
                    id="Metrage"
                    className={styles.Inputs}
                    value={balcony.metrage}
                    onChange={balconyEventHandler}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.checkbox_wrapper}>
                    <input
                      type="checkbox"
                      id="check9"
                      name="checked"
                      value={garage.checked}
                      onChange={garageEventHandler}
                    />
                    <label htmlFor="check9">
                      <span></span>
                    </label>
                  </div>
                </td>
                <td>
                  <img src={garageIcon} className={styles.Icons} />
                </td>
                <td>Garage</td>
                <td>
                  <label htmlFor="Number">Number:</label>
                  <input
                    type="number"
                    name="number"
                    min="0"
                    id="Number"
                    className={styles.Inputs}
                    value={garage.number}
                    onChange={garageEventHandler}
                  />
                </td>
                <td>
                  <label htmlFor="Metrage">Metrage:</label>
                  <input
                    type="number"
                    name="metrage"
                    min="0"
                    id="Metrage"
                    className={styles.Inputs}
                    value={garage.metrage}
                    onChange={garageEventHandler}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.DisAndFic}>
        <div className={styles.Facilities}>
          <h3>Facilities</h3>
          <div className={styles.FacilitiesDiv}>
            <div className={styles.Row5}>
              <div className={styles.Row51}>
                <div>
                  <div className={styles.checkbox_wrapper}>
                    <input
                      type="checkbox"
                      id="check10"
                      name="wifi"
                      value={facilities.wifi}
                      onChange={facilitiesEventHandler}
                    />
                    <label htmlFor="check10">
                      <span></span>
                    </label>
                  </div>
                </div>
                <div>
                  <img src={wifiIcon} className={styles.Icons} />
                </div>
                <div>
                  <h5 className={styles.FacilitiesH5}>WIFI</h5>
                </div>
              </div>
              <div className={styles.Row51}>
                <div>
                  <div className={styles.checkbox_wrapper}>
                    <input
                      type="checkbox"
                      id="check11"
                      name="parking"
                      value={facilities.parking}
                      onChange={facilitiesEventHandler}
                    />
                    <label htmlFor="check11">
                      <span></span>
                    </label>
                  </div>
                </div>
                <div>
                  <img src={parkingIcon} className={styles.Icons} />
                </div>
                <div>
                  <h5 className={styles.FacilitiesH5}>Parking</h5>
                </div>
              </div>
            </div>
            <div className={styles.Row5}>
              <div className={styles.Row51}>
                <div>
                  <div className={styles.checkbox_wrapper}>
                    <input
                      type="checkbox"
                      id="check12"
                      name="pool"
                      value={facilities.pool}
                      onChange={facilitiesEventHandler}
                    />
                    <label htmlFor="check12">
                      <span></span>
                    </label>
                  </div>
                </div>
                <div>
                  <img src={poolIcon} className={styles.Icons} />
                </div>
                <div>
                  <h5 className={styles.FacilitiesH5}>Pool</h5>
                </div>
              </div>
              <div className={styles.Row51}>
                <div>
                  <div className={styles.checkbox_wrapper}>
                    <input
                      type="checkbox"
                      id="check13"
                      name="furniture"
                      value={facilities.furniture}
                      onChange={facilitiesEventHandler}
                    />
                    <label htmlFor="check13">
                      <span></span>
                    </label>
                  </div>
                </div>
                <div>
                  <img src={furintureIcon} className={styles.Icons} />
                </div>
                <div>
                  <h5 className={styles.FacilitiesH5}>Furniture</h5>
                </div>
              </div>
            </div>
            <div className={styles.Row5}>
              <div className={styles.Row51}>
                <div>
                  <div className={styles.checkbox_wrapper}>
                    <input
                      type="checkbox"
                      id="check14"
                      name="elevator"
                      value={facilities.elevator}
                      onChange={facilitiesEventHandler}
                    />
                    <label htmlFor="check14">
                      <span></span>
                    </label>
                  </div>
                </div>
                <div>
                  <img src={elevatorIcon} className={styles.Icons} />
                </div>
                <div>
                  <h5 className={styles.FacilitiesH5}>Elevator</h5>
                </div>
              </div>
              <div className={styles.Row51}>
                <div>
                  <div className={styles.checkbox_wrapper}>
                    <input
                      type="checkbox"
                      id="check15"
                      name="garden"
                      value={facilities.garden}
                      onChange={facilitiesEventHandler}
                    />
                    <label htmlFor="check15">
                      <span></span>
                    </label>
                  </div>
                </div>
                <div>
                  <img src={gardenIcon} className={styles.Icons} />
                </div>
                <div>
                  <h5 className={styles.FacilitiesH5}>Garden</h5>
                </div>
              </div>
            </div>
            <div className={styles.Row5}>
              <div className={styles.Row51}>
                <div>
                  <div className={styles.checkbox_wrapper}>
                    <input
                      type="checkbox"
                      id="check16"
                      name="laundary"
                      value={facilities.laundary}
                      onChange={facilitiesEventHandler}
                    />
                    <label htmlFor="check16">
                      <span></span>
                    </label>
                  </div>
                </div>
                <div>
                  <img src={laundryIcon} className={styles.Icons} />
                </div>
                <div>
                  <h5 className={styles.FacilitiesH5}>Laundary</h5>
                </div>
              </div>
              <div className={styles.Row51}>
                <div>
                  <div className={styles.checkbox_wrapper}>
                    <input
                      type="checkbox"
                      id="check17"
                      name="bbq"
                      value={facilities.bbq}
                      onChange={facilitiesEventHandler}
                    />
                    <label htmlFor="check17">
                      <span></span>
                    </label>
                  </div>
                </div>
                <div>
                  <img src={bbqIcon} className={styles.Icons} />
                </div>
                <div>
                  <h5 className={styles.FacilitiesH5}>BBQ</h5>
                </div>
              </div>
            </div>
            <div className={styles.Row5}>
              <div className={styles.Row51}>
                <div>
                  <div className={styles.checkbox_wrapper}>
                    <input
                      type="checkbox"
                      id="check18"
                      name="gym"
                      value={facilities.gym}
                      onChange={facilitiesEventHandler}
                    />
                    <label htmlFor="check18">
                      <span></span>
                    </label>
                  </div>
                </div>
                <div>
                  <img src={gymIcon} className={styles.Icons} />
                </div>
                <div>
                  <h5 className={styles.FacilitiesH5}>Gym</h5>
                </div>
              </div>
              <div className={styles.Row51}>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.Row4}>
          <h3>Description of Estate</h3>
          <div className={styles.DescriptionDiv}>
            <textarea
              placeholder="description"
              name="description"
              value={information.description}
              onChange={basicEventHandler}
              className={styles.DescriptionTextArea}
            ></textarea>
          </div>
        </div>
      </div>

      <div className={styles.Uploader}>
        <div className={styles.ImgUploader}>
          <h3>Image Uploader</h3>
          <div className={styles.UploadDiv}>
            <input
              type="file"
              id="file-input"
              name="imageInput"
              multiple
              hidden
              className={styles.fileInput}
              onChange={imgHandler}
            />
          </div>
          <div className={styles.previewContainer} id="preview-container">
            {previewImages.length > 0 && (
              <div>
                {previewImages.map((imageURL) => (
                  <img
                    key={imageURL}
                    src={imageURL}
                    alt="Preview"
                    width="200"
                  />
                ))}
              </div>
            )}
            {previewImages.length == 0 && (
              <div className={styles.uploadIcon} id="UploadIcon">
                <div>
                  <img src={uploadIcon} className={styles.UploadIcon2} />
                </div>
                <div>
                  <h3>Uploade Image and Show photos</h3>
                </div>
              </div>
            )}
          </div>
          <label htmlFor="file-input" className={styles.ChooseLabel}>
            Choose Image
          </label>
        </div>

        <div className={styles.VideoUploader}>
          <h3>Video Uploader</h3>
          <div className={styles.UploadDiv}>
            <input
              type="file"
              className={styles.fileInput2}
              id="file-input2"
              multiple
              hidden
            />
          </div>
          <div className={styles.previewContainer2} id="preview-container2">
            <div id="UploadIcon" className={styles.uploadIcon}>
              <div>
                <img src={uploadIcon} className={styles.UploadIcon2} />
              </div>
              <div>
                <h3>Uploade Image and Show photos</h3>
              </div>
            </div>
          </div>
          <label htmlFor="file-input2" className={styles.ChooseLabel}>
            Choose Video
          </label>
        </div>

        <button
          className={styles.AddButton}
          type="Submit"
          onSubmit={submitHandler}
        >
          <span className={styles.text}>Add</span>
          <span>+</span>
        </button>
      </div>
    </form>
  );
};

export default ConfingEstate;
