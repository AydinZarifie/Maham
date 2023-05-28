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

  const [information, setInformation] = useState({
    img: [],
    videos: [],

    title: estate ? estate.title : "",//
    countryName: estate ? estate.country : "",//
    cityName: estate ? estate.city : "",//
    streetName: estate ? estate.streetName : "",//
    plate: estate ? estate.plate : "",//
    numberOfPlate: estate ? estate.plateNumber : "",//
    numberOfFloor: estate ? estate.floorNumber : "",//
    numberOfUnit: estate ? estate.unit : "",//
    location: estate ? estate.location : "",//

    type: estate ? estate.type : "",//

    bedroom: {
      checked: estate ? estate.bedroom.checked : false,
      number: estate ? estate.bedroom.number : "",
      metrage: estate ? estate.bedroom.metrage : "",
    },
    livingRoom: {
      checked: estate ? estate.livingRoom.checked : false,
      number: estate ? estate.livingRoom.number : "",
      metrage: estate ? estate.livingRoom.metrage : "",
    },
    kitchen: {
      checked: estate ? estate.kitchen.checked : false,
      number: estate ? estate.kitchen.number : "",
      metrage: estate ? estate.kitchen.metrage : "",
    },
    diningroom: {
      checked: estate ? estate.diningroom.checked : false,
      number: estate ? estate.diningroom.number : "",
      metrage: estate ? estate.diningroom.metrage : "",
    },
    guestroom: {
      checked: estate ? estate.guestroom.checked : false,
      number: estate ? estate.guestroom.number : "",
      metrage: estate ? estate.guestroom.metrage : "",
    },
    bathroom: {
      checked: estate ? estate.bathroom.checked : false,
      number: estate ? estate.bathroom.number : "",
      metrage: estate ? estate.bathroom.metrage : "",
    },
    garden: {
      checked: estate ? estate.garden.checked : false,
      number: estate ? estate.garden.number : "",
      metrage: estate ? estate.garden.metrage : "",
    },
    balcony: {
      checked: estate ? estate.balcony.checked : false,
      number: estate ? estate.balcony.number : "",
      metrage: estate ? estate.balcony.metrage : "",
    },
    garage: {
      checked: estate ? estate.garage.checked : false,
      number: estate ? estate.garage.number : "",
      metrage: estate ? estate.garage.metrage : "",
    },

    facilities: {
      wifi: estate ? estate.facilities.wifi : false,
      parking: estate ? estate.facilities.parking : false,
      pool: estate ? estate.facilities.pool : false,
      furniture: estate ? estate.facilities.furniture : false,
      elevator: estate ? estate.facilities.elevator : false,
      garden: estate ? estate.facilities.garden : false,
      laundary: estate ? estate.facilities.laundary : false,
      bbq: estate ? estate.facilities.bbq : false,
      gym: estate ? estate.facilities.gym : false,
    },

    description: estate ? estate.description : "",
  });

  function basicEventHandler(event) {
    const { name, value } = event.target;
    setInformation((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // function submitHandler() {
  //   const proceed = window.confirm("Are you sure?");

  //   if (proceed) {
  //     submit(information, { method: method });
  //   }
  // }

  return (
    <Form method={method}>
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
              <select value={information.countryName} onChange={basicEventHandler} name="countryName">
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
              <select value={information.cityName} onChange={basicEventHandler} name="cityName">
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
        <select value={information.type} onChange={basicEventHandler} name="type">
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
                    <input type="checkbox" id="check1" name="checkBedroom" value="" />
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
                    name="numberBedroom"
                    min="0"
                    id="Number"
                    className={styles.Inputs}
                  />
                </td>
                <td>
                  <label htmlFor="Metrage">Metrage:</label>
                  <input
                    type="number"
                    name="metrageBedroom"
                    min="0"
                    id="Metrage"
                    className={styles.Inputs}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.checkbox_wrapper}>
                    <input type="checkbox" id="check2" name="checkLivingroom" value="" />
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
                    name="numberLivingroom"
                    min="0"
                    id="Number"
                    className={styles.Inputs}
                  />
                </td>
                <td>
                  <label htmlFor="Metrage">Metrage:</label>
                  <input
                    type="number"
                    name="metrageLivingroom"
                    min="0"
                    id="Metrage"
                    className={styles.Inputs}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.checkbox_wrapper}>
                    <input type="checkbox" id="check3" name="checkKitchen" value="" />
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
                    name="numberKitchen"
                    min="0"
                    id="Number"
                    className={styles.Inputs}
                  />
                </td>
                <td>
                  <label htmlFor="Metrage">Metrage:</label>
                  <input
                    type="number"
                    name="metrageKitchen"
                    min="0"
                    id="Metrage"
                    className={styles.Inputs}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.checkbox_wrapper}>
                    <input type="checkbox" id="check4" name="checkDiningroom" value="" />
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
                    name="numberDiningroom"
                    min="0"
                    id="Number"
                    className={styles.Inputs}
                  />
                </td>
                <td>
                  <label htmlFor="Metrage">Metrage:</label>
                  <input
                    type="number"
                    name="metrageDiningroom"
                    min="0"
                    id="Metrage"
                    className={styles.Inputs}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.checkbox_wrapper}>
                    <input type="checkbox" id="check5" name="checkGuestroom" value="" />
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
                    name="numberGuestroom"
                    min="0"
                    id="Number"
                    className={styles.Inputs}
                  />
                </td>
                <td>
                  <label htmlFor="Metrage">Metrage:</label>
                  <input
                    type="number"
                    name="metrageGuestroom"
                    min="0"
                    id="Metrage"
                    className={styles.Inputs}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.checkbox_wrapper}>
                    <input type="checkbox" id="check6" name="checkBathroom" value="" />
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
                    name="numberBathroom"
                    min="0"
                    id="Number"
                    className={styles.Inputs}
                  />
                </td>
                <td>
                  <label htmlFor="Metrage">Metrage:</label>
                  <input
                    type="number"
                    name="metrageBathroom"
                    min="0"
                    id="Metrage"
                    className={styles.Inputs}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.checkbox_wrapper}>
                    <input type="checkbox" id="check7" name="checkGarden" value="" />
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
                    name="numberGarden"
                    min="0"
                    id="Number"
                    className={styles.Inputs}
                  />
                </td>
                <td>
                  <label htmlFor="Metrage">Metrage:</label>
                  <input
                    type="number"
                    name="metrageGarden"
                    min="0"
                    id="Metrage"
                    className={styles.Inputs}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.checkbox_wrapper}>
                    <input type="checkbox" id="check8" name="checkBalcony" value="" />
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
                    name="numberBalcony"
                    min="0"
                    id="Number"
                    className={styles.Inputs}
                  />
                </td>
                <td>
                  <label htmlFor="Metrage">Metrage:</label>
                  <input
                    type="number"
                    name="metrageBalcony"
                    min="0"
                    id="Metrage"
                    className={styles.Inputs}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.checkbox_wrapper}>
                    <input type="checkbox" id="check9" name="checkGarage" value="" />
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
                    name="numberGarage"
                    min="0"
                    id="Number"
                    className={styles.Inputs}
                  />
                </td>
                <td>
                  <label htmlFor="Metrage">Metrage:</label>
                  <input
                    type="number"
                    name="metrageGarage"
                    min="0"
                    id="Metrage"
                    className={styles.Inputs}
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
                    <input type="checkbox" id="check10" name="checkWifi" value="" />
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
                    <input type="checkbox" id="check11" name="checkParking" value="" />
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
                    <input type="checkbox" id="check12" name="checkPool" value="" />
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
                    <input type="checkbox" id="check13" name="checkFurniture" value="" />
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
                    <input type="checkbox" id="check14" name="checkElevator" value="" />
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
                    <input type="checkbox" id="check15" name="checkGarden" value="" />
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
                    <input type="checkbox" id="check16" name="checkLaundary" value="" />
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
                    <input type="checkbox" id="check17" name="checkBbq" value="" />
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
                    <input type="checkbox" id="check18" name="checkGym" value="" />
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
              multiple
              accept="Image"
              hidden
              // onclick="DeleteDiv"
              className={styles.fileInput}
            />
          </div>
          <div className={styles.previewContainer} id="preview-container">
            <div className={styles.uploadIcon} id="UploadIcon">
              <div>
                <img src={uploadIcon} className={styles.UploadIcon2} />
              </div>
              <div>
                <h3>Uploade Image and Show photos</h3>
              </div>
            </div>
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
              accept="Video"
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
        >
          <span className={styles.text}>Add</span>
          <span>+</span>
        </button>
      </div>
    </Form>
  );
};

export default ConfingEstate;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const formData=new FormData();
  // console.log(request);

  formData.append('title',data.get('title'))
  formData.append('cityName',data.get('cityName'))
  formData.append('countryName',data.get('countryName'))
  formData.append('streetName',data.get('streetName'))
  formData.append('plate',data.get('plate'))
  formData.append('numberOfPlate',data.get('numberOfPlate'))
  formData.append('numberOfFloor',data.get('numberOfFloor'))
  formData.append('location',data.get('location'))

  formData.append('type',data.get('type'))

  formData.append('checkBedroom',data.get('checkBedroom'))
  formData.append('numberBedroom',data.get('numberBedroom'))
  formData.append('metrageBedroom',data.get('metrageBedroom'))

  formData.append('checkLivingRoom',data.get('checkLivingRoom'))
  formData.append('numberLivingRoom',data.get('numberLivingRoom'))
  formData.append('metrageLivingRoom',data.get('metrageLivingRoom'))

  formData.append('checkKitchen',data.get('checkKitchen'))
  formData.append('numberKitchen',data.get('numberKitchen'))
  formData.append('metrageKitchen',data.get('metrageKitchen'))

  formData.append('checkDiningroom',data.get('checkDiningroom'))
  formData.append('numberDiningroom',data.get('numberDiningroom'))
  formData.append('metrageDiningroom',data.get('metrageDiningroom'))

  formData.append('checkGuestroom',data.get('checkGuestroom'))
  formData.append('numberGuestroom',data.get('numberGuestroom'))
  formData.append('metrageGuestroom',data.get('metrageGuestroom'))

  formData.append('checkBathroom',data.get('checkBathroom'))
  formData.append('numberBathroom',data.get('numberBathroom'))
  formData.append('metrageBathroom',data.get('metrageBathroom'))

  formData.append('checkGarden',data.get('checkGarden'))
  formData.append('numberGarden',data.get('numberGarden'))
  formData.append('metrageGarden',data.get('metrageGarden'))

  formData.append('checkBalcony',data.get('checkBalcony'))
  formData.append('numberBalcony',data.get('numberBalcony'))
  formData.append('metrageBalcony',data.get('metrageBalcony'))

  formData.append('checkGarage',data.get('checkGarage'))
  formData.append('numberGarage',data.get('numberGarage'))
  formData.append('metrageGarage',data.get('metrageGarage'))

  formData.append('checkWifi',data.get('checkWifi'))
  formData.append('checkParking',data.get('checkParking'))
  formData.append('checkPool',data.get('checkPool'))
  formData.append('checkFurniture',data.get('checkFurniture'))
  formData.append('checkElevator',data.get('checkElevator'))
  formData.append('checkGarden',data.get('checkGarden'))
  formData.append('checkLaundary',data.get('checkLaundary'))
  formData.append('checkBbq',data.get('checkBbq'))
  formData.append('checkGym',data.get('checkGym'))

  formData.append('description',data.get('description'))




  // const estateData = {
  //   title: data.get('title')
  // };

  let url = "https://react2-7c43a-default-rtdb.asia-southeast1.firebasedatabase.app/estates.json";

  if (method === "PATCH") {
    const estateId = params.estateId;
    url = "https://react2-7c43a-default-rtdb.asia-southeast1.firebasedatabase.app/estates.json" + estateId;
  }

  const response = await fetch(url, {
    method: method,
    body: formData
  });

  // if (response.status === 422) {
  //   return response;
  // }

  // if (!response.ok) {
  //   throw json({ message: "Could not save estate." }, { status: 500 });
  // }

  return redirect("/admin/estates");
}
