import styles from "../../styles/Add_Estate.module.css";
import locationStyles from "../../styles/addLocation.module.css";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import trueLogo from "../../images/tick-svgrepo-com_1.svg";
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
import deleteIcon from "../../images/delete-svgrepo-com.svg";
import fetchInstance from "../../util/fetchInstance";
import MultiSelect from "../../components/general/MultiSelect";
import Alert from "../../components/general/Alert";
import attentionIcon from "../../images/attention-svgrepo-com.svg";
import warningIcon from "../../images/warning-attention-svgrepo-com.svg";
import deleteIcon2 from "../../images/delete-2-svgrepo-com2.svg";
import editIcon from "../../images/edit-pencil-line-01-svgrepo-com.svg";

/////////////////////web3///////////////////////
import { mint, burn } from "../web3/MHM2023";
import { ethers } from "ethers";
///////////////////////////////////////////////
const ConfingEstate = ({ method, estate }) => {
  const [loading, setLoading] = useState(false);

  const [detailBox, setDetailBox] = useState(false);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [filters, setFilters] = useState([]);
  const [mintUsed, setMintUsed] = useState(false);
  const [error, setError] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  const facilityLocationRef = useRef([]);

  const scrollToError = () => {
    const errorElement = document.querySelector(`.${styles.invalid}`);
    if (errorElement) {
      errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  useEffect(() => {
    const fetchCountryData = async () => {
      let { response, data } = await fetchInstance(
        "/admin/estate/getCountries"
      );
      setCountries(data.data);
    };
    fetchCountryData();
    if (estate) {
      cityFetch(estate.country_name);
    }

    const fetchFilterData = async () => {
      let { response, data } = await fetchInstance(
        "/admin/estate/getAddEstateFilters"
      );
      setFilters(data.data);
    };
    fetchFilterData();
  }, []);

  const cityFetch = async (name) => {
    let { response, data } = await fetchInstance(
      "/admin/estate/getCities/" + name
    );
    setCities(data.data);
  };

  const navigate = useNavigate();

  const [selectedFilters, setSelectedFilters] = useState(
    estate ? estate.filter : []
  );
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const [selectedVideo, setSelectedVideo] = useState([]);
  const [previewUrl, setPreviewUrl] = useState([]);

  const [facilityLocation, setFacilityLocation] = useState([
    { title: "hello", input: "", childList: ["hello 1", "hello 2"] },
    { title: "old", input: "", childList: ["old 1", "old 2"] },
  ]);

  const [bedroom, setBedroom] = useState({
    checked: estate ? estate.estate_rooms[0].bedroom : false,
    number: estate ? estate.estate_rooms[0].bedroom_count : "",
    metrage: estate ? estate.estate_rooms[0].bedroom_size : "",
  });
  const [livingRoom, setLivingroom] = useState({
    checked: estate ? estate.estate_rooms[0].livingroom : false,
    number: estate ? estate.estate_rooms[0].livingroom_count : "",
    metrage: estate ? estate.estate_rooms[0].livingroom_size : "",
  });
  const [kitchen, setKitchen] = useState({
    checked: estate ? estate.estate_rooms[0].kitchen : false,
    number: estate ? estate.estate_rooms[0].kitchen_count : "",
    metrage: estate ? estate.estate_rooms[0].kitchen_size : "",
  });
  const [diningroom, setDiningroom] = useState({
    checked: estate ? estate.estate_rooms[0].diningRoom : false,
    number: estate ? estate.estate_rooms[0].diningRoom_count : "",
    metrage: estate ? estate.estate_rooms[0].diningRoom_size : "",
  });
  const [guestroom, setGuestroom] = useState({
    checked: estate ? estate.estate_rooms[0].guestRoom : false,
    number: estate ? estate.estate_rooms[0].guestRoom_count : "",
    metrage: estate ? estate.estate_rooms[0].guestRoom_size : "",
  });
  const [bathroom, setBathroom] = useState({
    checked: estate ? estate.estate_rooms[0].bathroom : false,
    number: estate ? estate.estate_rooms[0].bathroom_count : "",
    metrage: estate ? estate.estate_rooms[0].bathroom_size : "",
  });
  const [garden, setGarden] = useState({
    checked: estate ? estate.estate_rooms[0].garden : false,
    number: estate ? estate.estate_rooms[0].garden_count : "",
    metrage: estate ? estate.estate_rooms[0].garden_size : "",
  });
  const [balcony, setBalcony] = useState({
    checked: estate ? estate.estate_rooms[0].balcony : false,
    number: estate ? estate.estate_rooms[0].balcony_count : "",
    metrage: estate ? estate.estate_rooms[0].balcony_size : "",
  });
  const [garage, setGarage] = useState({
    checked: estate ? estate.estate_rooms[0].garage : false,
    number: estate ? estate.estate_rooms[0].garage_count : "",
    metrage: estate ? estate.estate_rooms[0].garage_size : "",
  });
  const [facilities, setfacilities] = useState({
    wifi: estate ? estate.estate_facilities[0].WiFi : false,
    parking: estate ? estate.estate_facilities[0].parkingLot : false,
    pool: estate ? estate.estate_facilities[0].swimming_Pool : false,
    furniture: estate ? estate.estate_facilities[0].furniture : false,
    elevator: estate ? estate.estate_facilities[0].elevator : false,
    garden: estate ? estate.estate_facilities[0].garden : false,
    laundary: estate ? estate.estate_facilities[0].loundry_facilities : false,
    bbq: estate ? estate.estate_facilities[0].barbique : false,
    gym: estate ? estate.estate_facilities[0].fitness_center : false,
  });
  const [information, setInformation] = useState({
    title: estate ? estate.estate_title : "",
    countryName: estate ? estate.country_name : "",
    cityName: estate ? estate.city_name : "",
    streetName: estate ? estate.main_street : "",
    numberOfPlate: estate ? estate.building_number : "",
    numberOfFloor: estate ? estate.floor_number : "",
    numberOfUnit: estate ? estate.unit_number : "",
    location: estate ? estate.location : "",
    type: estate ? estate.estate_type : "",
    description: estate ? estate.state_description : "",
    summary: estate ? estate.summary_description : "",
    // filter: estate ? estate.filter : "",
    mahamPrice: estate ? estate.maham_price : "",
    customerPrice: "",
    // estate ? estate.customerPrice : "",
    id: estate ? estate.mint_id : "",
    buildingName: estate ? estate.buildingName : "",
    builtYear: estate ? estate.builtYear : "",
    propertyStyle: estate ? estate.propertyStyle : "",
    facilityLocation: "",
    // estate ? estate.id : "",

    //  plate: estate ? estate.plate : "",
    //  walletAddress:estate ? estate.walletAddress :"",
  });

  function facilityLocationEventHandler(index, event) {
    const newValues = [...facilityLocation];
    newValues[index].input = event.target.value;
    setFacilityLocation(newValues);
  }

  function basicEventHandler(event) {
    const { name, value } = event.target;
    if (name == "countryName") {
      cityFetch(value);
    } else if (name == "cityName") {
      if (!estate) {
        idManipulataionHandler(value);
      }
    } else if (name == "summary") {
      if (value.length >= 34) {
        const newValue = value.slice(0, 34);
        setInformation((prev) => ({ ...prev, [name]: newValue }));
        return;
      } else {
        setInformation((prev) => ({ ...prev, [name]: value }));
        return;
      }
    }
    setInformation((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function bedroomEventHandler(event) {
    const { name, value, checked } = event.target;
    if (name == "checked") {
      setBedroom((prev) => ({
        ...prev,
        checked: checked,
      }));
      return;
    }
    setBedroom((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function livingRoomEventHandler(event) {
    const { name, value, checked } = event.target;
    if (name == "checked") {
      setLivingroom((prev) => ({
        ...prev,
        checked: checked,
      }));
      return;
    }
    setLivingroom((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function kitchenEventHandler(event) {
    const { name, value, checked } = event.target;
    if (name == "checked") {
      setKitchen((prev) => ({
        ...prev,
        checked: checked,
      }));
      return;
    }
    setKitchen((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function diningroomEventHandler(event) {
    const { name, value, checked } = event.target;
    if (name == "checked") {
      setDiningroom((prev) => ({
        ...prev,
        checked: checked,
      }));
      return;
    }
    setDiningroom((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function guestroomEventHandler(event) {
    const { name, value, checked } = event.target;
    if (name == "checked") {
      setGuestroom((prev) => ({
        ...prev,
        checked: checked,
      }));
      return;
    }
    setGuestroom((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function bathroomEventHandler(event) {
    const { name, value, checked } = event.target;
    if (name == "checked") {
      setBathroom((prev) => ({
        ...prev,
        checked: checked,
      }));
      return;
    }
    setBathroom((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function gardenEventHandler(event) {
    const { name, value, checked } = event.target;
    if (name == "checked") {
      setGarden((prev) => ({
        ...prev,
        checked: checked,
      }));
      return;
    }
    setGarden((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function balconyEventHandler(event) {
    const { name, value, checked } = event.target;
    if (name == "checked") {
      setBalcony((prev) => ({
        ...prev,
        checked: checked,
      }));
      return;
    }
    setBalcony((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function garageEventHandler(event) {
    const { name, value, checked } = event.target;
    if (name == "checked") {
      setGarage((prev) => ({
        ...prev,
        checked: checked,
      }));
      return;
    }
    setGarage((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function facilitiesEventHandler(event) {
    const { name, checked } = event.target;
    setfacilities((prev) => ({
      ...prev,
      [name]: checked,
    }));
  }

  const imgHandler = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setSelectedImages(selectedFiles);

    const previewURLs = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages(previewURLs);
  };

  const vidHandler = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setSelectedVideo(selectedFiles);

    const previewURLs = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrl(previewURLs);
  };

  const enteredFilterIsValid = selectedFilters.length > 0;
  const enteredTitleIsValid = information.title.trim() !== "";
  const enteredCountryNameIsValid = information.countryName.trim() !== "";
  const enteredCityNameIsValid = information.cityName.trim() !== "";
  const enteredStreetNameIsValid = information.streetName.trim() !== "";
  const enteredNumberOfPlateIsValid = information.numberOfPlate.trim() !== "";
  const enteredNumberOfFloorIsValid = information.numberOfFloor.trim() !== "";
  const enteredNumberOfUnitIsValid = information.numberOfUnit.trim() !== "";
  const enteredLocationIsValid = information.location.trim() !== "";
  const enteredTypeIsValid = information.type.trim() !== "";
  const enteredDescriptionIsValid = information.description.trim() !== "";
  const enteredMahamPriceIsValid =
    information.mahamPrice.toString().trim() !== "";
  const enteredCustomerPriceIsValid = information.customerPrice.trim() !== "";
  const enteredImageIsValid = selectedImages.length > 0;
  const enteredVideoIsValid = selectedVideo.length > 0;
  const enteredIdIsValid = information.id.trim() !== "";
  const enteredSummaryIsValid = information.summary.trim() !== "";
  const enteredBuildingNameIsValid = information.buildingName.trim() !== "";
  const enteredBuiltYearIsValid = information.builtYear.trim() !== "";
  const enteredPropertyStyleIsValid = information.propertyStyle.trim() !== "";

  // const enteredPlateIsValid = information.plate.trim() !== "";
  // const enteredWalletAddressIsValid = information.walletAddress.trim() !== "";

  const [touched, setTouched] = useState({
    title: false,
    countryName: false,
    cityName: false,
    streetName: false,
    numberOfPlate: false,
    numberOfFloor: false,
    numberOfUnit: false,
    location: false,
    type: false,
    description: false,
    mahamPrice: false,
    customerPrice: false,
    filter: false,
    image: false,
    video: false,
    id: false,
    summary: false,
    buildingName: false,
    builtYear: false,
    propertyStyle: false,

    // plate: false,
    // walletAddress: false,
  });

  const titleIsInvalid = !enteredTitleIsValid && touched.title;
  const countryNameIsInvalid =
    !enteredCountryNameIsValid && touched.countryName;
  const cityNameIsInvalid = !enteredCityNameIsValid && touched.cityName;
  const streetNameIsInvalid = !enteredStreetNameIsValid && touched.streetName;
  const numberOfPlateIsInvalid =
    !enteredNumberOfPlateIsValid && touched.numberOfPlate;
  const numberOfFloorIsInvalid =
    !enteredNumberOfFloorIsValid && touched.numberOfFloor;
  const numberOfUnitIsInvalid =
    !enteredNumberOfUnitIsValid && touched.numberOfUnit;
  const locationIsInvalid = !enteredLocationIsValid && touched.location;
  const typeIsInvalid = !enteredTypeIsValid && touched.type;
  const descriptionIsInvalid =
    !enteredDescriptionIsValid && touched.description;
  const priceMahamIsInvalid = !enteredMahamPriceIsValid && touched.mahamPrice;
  const priceCustomerIsInvalid =
    !enteredCustomerPriceIsValid && touched.customerPrice;
  const filterIsInvalid = !enteredFilterIsValid && touched.filter;
  const imageIsInvalid = !enteredImageIsValid && touched.image;
  const videoIsInvalid = !enteredVideoIsValid && touched.video;
  const idIsInvalid = !enteredIdIsValid && touched.id;
  const summaryIsInvalid = !enteredSummaryIsValid && touched.summary;
  const buildingNameIsInvalid =
    !enteredBuildingNameIsValid && touched.buildingName;
  const builtYearIsInvalid = !enteredBuiltYearIsValid && touched.builtYear;
  const propertyStyleIsInvalid =
    !enteredPropertyStyleIsValid && touched.propertyStyle;

  // const plateIsInvalid = !enteredPlateIsValid && touched.plate;
  // const walletAddressIsInvalid =
  // !enteredWalletAddressIsValid && touched.walletAddress;

  let formIsValidForAdding = false;
  let formIsValidForEditing = false;

  if (
    enteredFilterIsValid &&
    enteredTitleIsValid &&
    enteredCountryNameIsValid &&
    enteredCityNameIsValid &&
    enteredStreetNameIsValid &&
    enteredNumberOfPlateIsValid &&
    enteredNumberOfFloorIsValid &&
    enteredNumberOfUnitIsValid &&
    enteredLocationIsValid &&
    enteredTypeIsValid &&
    enteredDescriptionIsValid &&
    enteredMahamPriceIsValid &&
    enteredCustomerPriceIsValid &&
    enteredImageIsValid &&
    enteredVideoIsValid &&
    enteredIdIsValid &&
    enteredSummaryIsValid &&
    enteredBuildingNameIsValid &&
    enteredBuiltYearIsValid &&
    enteredPropertyStyleIsValid

    // enteredPlateIsValid &&
    // enteredWalletAddressIsValid
  ) {
    formIsValidForAdding = true;
  }

  if (
    enteredFilterIsValid &&
    enteredTitleIsValid &&
    enteredCountryNameIsValid &&
    enteredCityNameIsValid &&
    enteredStreetNameIsValid &&
    enteredNumberOfPlateIsValid &&
    enteredNumberOfFloorIsValid &&
    enteredNumberOfUnitIsValid &&
    enteredLocationIsValid &&
    enteredTypeIsValid &&
    enteredDescriptionIsValid &&
    enteredSummaryIsValid &&
    enteredBuildingNameIsValid &&
    enteredBuiltYearIsValid &&
    enteredPropertyStyleIsValid

    // enteredPlateIsValid &&
  ) {
    formIsValidForEditing = true;
  }

  const blurHandler = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // const filterClass = filterIsInvalid
  //   ? `${styles.invalid} ${styles.select} `
  //   : `${styles.select} `;
  const titleClass = titleIsInvalid
    ? `${styles.invalid} ${styles.textinput} `
    : `${styles.textinput} `;
  const countryNameClass = countryNameIsInvalid
    ? `${styles.invalid} ${styles.select} `
    : `${styles.select} `;
  const cityNameClass = cityNameIsInvalid
    ? `${styles.invalid} ${styles.select} `
    : `${styles.select} `;
  const streetNameClass = streetNameIsInvalid
    ? `${styles.invalid} ${styles.textinput} `
    : `${styles.textinput} `;
  const numberOfPlateClass = numberOfPlateIsInvalid
    ? `${styles.invalid} ${styles.textinput} `
    : `${styles.textinput} `;
  const numberOfFloorClass = numberOfFloorIsInvalid
    ? `${styles.invalid} ${styles.textinput} `
    : `${styles.textinput} `;
  const numberOfUnitClass = numberOfUnitIsInvalid
    ? `${styles.invalid} ${styles.textinput} `
    : `${styles.textinput} `;
  const locationClass = locationIsInvalid
    ? `${styles.invalid} ${styles.textinput} `
    : `${styles.textinput} `;
  const typeClass = typeIsInvalid
    ? `${styles.invalid} ${styles.select} `
    : `${styles.select} `;
  const descriptionClass = descriptionIsInvalid
    ? `${styles.invalid} ${styles.DescriptionTextArea} `
    : `${styles.DescriptionTextArea} `;
  const mahamPriceClass = priceMahamIsInvalid
    ? `${styles.invalid} ${styles.textinput} `
    : `${styles.textinput} `;
  const customerPriceClass = priceCustomerIsInvalid
    ? `${styles.invalid} ${styles.textinput} `
    : `${styles.textinput} `;
  const imageClass = imageIsInvalid
    ? `${styles.invalid} ${styles.previewContainer} `
    : `${styles.previewContainer} `;
  const videoClass = videoIsInvalid
    ? `${styles.invalid} ${styles.previewContainer2} `
    : `${styles.previewContainer2} `;
  const idClass = idIsInvalid
    ? `${styles.invalid} ${styles.textinput} `
    : `${styles.textinput} `;
  const summaryClass = summaryIsInvalid
    ? `${styles.invalid} ${styles.DescriptionTextArea2} `
    : `${styles.DescriptionTextArea2} `;

  const buildingNameClass = buildingNameIsInvalid
    ? `${styles.invalid} ${styles.textinput} `
    : `${styles.textinput} `;

  const builtYearClass = builtYearIsInvalid
    ? `${styles.invalid} ${styles.textinput} `
    : `${styles.textinput} `;

  const propertyStyleClass = propertyStyleIsInvalid
    ? `${styles.invalid} ${styles.textinput} `
    : `${styles.textinput} `;

  const plateClass = styles.textinput;
  // plateIsInvalid
  //   ? `${styles.invalid} ${styles.textinput} `
  //   : `${styles.textinput} `;
  const walletAddressClass = styles.textinput;
  // walletAddressIsInvalid
  //   ? `${styles.invalid} ${styles.textinput} `
  //   : `${styles.textinput} `;

  const submitHandler = async (event) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signers = provider.getSigner();
    if(!signers._address){
      //show error please connect or install your metamask
    }

    //set fetch for authorize the admin wallet 
    //error status 400,403
    let { res } = await fetchInstance("url for authorize", {
      // method: method,
      // body: formData,
    });
    if(res.status==400 || res.staus==403){
      
    }else{
      //put every thing in here
    }


    setLoading(true);

    setTouched({
      title: true,
      countryName: true,
      cityName: true,
      streetName: true,
      numberOfPlate: true,
      numberOfFloor: true,
      numberOfUnit: true,
      location: true,
      type: true,
      description: true,
      image: true,
      mahamPrice: true,
      customerPrice: true,
      filter: true,
      image: true,
      video: true,
      id: true,
      summary: true,
      buildingName: true,
      builtYear: true,
      propertyStyle: true,

      // plate: true,
      // walletAddress: true,
    });

    if (estate) {
      if (!formIsValidForEditing) {
        scrollToError();
        return;
      }
    } else {
      if (!formIsValidForAdding) {
        scrollToError();
        return;
      }
    }
    // event.preventDefault();

    const formData = new FormData();

    for (var i = 0; i < selectedFilters.length; i++) {
      formData.append("filter", selectedFilters[i]);
    }

    formData.append("mintId", information.id);
    // formData.append("customerPrice", information.customerPrice);
    formData.append("title", information.title);
    formData.append("cityName", information.cityName);
    formData.append("countryName", information.countryName);
    formData.append("numberOfUnit", information.numberOfUnit);
    formData.append("streetName", information.streetName);
    formData.append("plate", information.plate);
    formData.append("numberOfPlate", information.numberOfPlate);
    formData.append("numberOfFloor", information.numberOfFloor);
    formData.append("location", information.location);
    formData.append("mahamPrice", information.mahamPrice);
    formData.append("type", information.type);

    if (!estate) {
      formData.append("customerPrice", information.customerPrice);
    }

    let totalMetrage = 0;

    formData.append("checkBedroom", bedroom.checked);
    if (bedroom.checked) {
      if (bedroom.number > 0) {
        if (bedroom.metrage > 0) {
          formData.append("numberBedroom", bedroom.number);
          formData.append("metrageBedroom", bedroom.metrage);
          totalMetrage = totalMetrage + parseInt(bedroom.metrage);
        }
      }
    }

    formData.append("checkLivingRoom", livingRoom.checked);
    if (livingRoom.checked) {
      if (livingRoom.number > 0) {
        if (livingRoom.metrage > 0) {
          formData.append("numberLivingRoom", livingRoom.number);
          formData.append("metrageLivingRoom", livingRoom.metrage);
          totalMetrage = totalMetrage + parseInt(livingRoom.metrage);
        }
      }
    }

    formData.append("checkKitchen", kitchen.checked);
    if (kitchen.checked) {
      if (kitchen.number > 0) {
        if (kitchen.metrage > 0) {
          formData.append("numberKitchen", kitchen.number);
          formData.append("metrageKitchen", kitchen.metrage);
          totalMetrage = totalMetrage + parseInt(kitchen.metrage);
        }
      }
    }

    formData.append("checkDiningroom", diningroom.checked);
    if (diningroom.checked) {
      if (diningroom.number > 0) {
        if (diningroom.metrage > 0) {
          formData.append("numberDiningroom", diningroom.number);
          formData.append("metrageDiningroom", diningroom.metrage);
          totalMetrage = totalMetrage + parseInt(diningroom.metrage);
        }
      }
    }

    formData.append("checkGuestroom", guestroom.checked);
    if (guestroom.checked) {
      if (guestroom.number > 0) {
        if (guestroom.metrage > 0) {
          formData.append("numberGuestroom", guestroom.number);
          formData.append("metrageGuestroom", guestroom.metrage);
          totalMetrage = totalMetrage + parseInt(guestroom.metrage);
        }
      }
    }

    formData.append("checkBathroom", bathroom.checked);
    if (bathroom.checked) {
      if (bathroom.number > 0) {
        if (bathroom.metrage > 0) {
          formData.append("numberBathroom", bathroom.number);
          formData.append("metrageBathroom", bathroom.metrage);
          totalMetrage = totalMetrage + parseInt(bathroom.metrage);
        }
      }
    }

    formData.append("checkGarden", garden.checked);
    if (garden.checked) {
      if (garden.number > 0) {
        if (garden.metrage > 0) {
          formData.append("numberGarden", garden.number);
          formData.append("metrageGarden", garden.metrage);
          totalMetrage = totalMetrage + parseInt(garden.metrage);
        }
      }
    }

    formData.append("checkBalcony", balcony.checked);
    if (balcony.checked) {
      if (balcony.number > 0) {
        if (balcony.metrage > 0) {
          formData.append("numberBalcony", balcony.number);
          formData.append("metrageBalcony", balcony.metrage);
          totalMetrage = totalMetrage + parseInt(balcony.metrage);
        }
      }
    }

    formData.append("checkGarage", garage.checked);
    if (garage.checked) {
      if (garage.number > 0) {
        if (garage.metrage > 0) {
          formData.append("numberGarage", garage.number);
          formData.append("metrageGarage", garage.metrage);
          totalMetrage = totalMetrage + parseInt(garage.metrage);
        }
      }
    }

    formData.append("checkWifi", facilities.wifi);
    formData.append("checkParking", facilities.parking);
    formData.append("checkPool", facilities.pool);
    formData.append("checkFurniture", facilities.furniture);
    formData.append("checkElevator", facilities.elevator);
    formData.append("checkGardenFacility", facilities.garden);
    formData.append("checkLaundary", facilities.laundary);
    formData.append("checkBbq", facilities.bbq);
    formData.append("checkGym", facilities.gym);

    formData.append("description", information.description);
    formData.append("summary", information.summary);

    if (selectedImages.length > 0) {
      selectedImages.forEach((file) => {
        formData.append("images", file);
      });
    }

    if (selectedVideo.length > 0) {
      selectedVideo.forEach((file) => {
        formData.append("video", file);
      });
    }

    let url = "/admin/estates";

    if (method === "PUT") {
      const estateId = estate._id;
      url = "/admin/estates/" + estateId;
    }

    let { response } = await fetchInstance(url, {
      method: method,
      body: formData,
    });

    if (response.ok) {
      if (method === "POST") {
        //blockchain proccess
        const mintId = Number(information.id);
        mint(mintId, signers).then((mintRes) => {
          formData.append("hash", mintRes.hash);
          formData.append("method", "transfer");
          formData.append("from", mintRes.from);
          formData.append("to", mintRes.to);
          let dateObject = new Date();
          let day = dateObject.getDate();
          let month = dateObject.getMonth();
          let year = dateObject.getFullYear();
          let date = year + "/" + (month + 1) + "/" + day;
          formData.append("date", date);
          console.log(mintRes);
          navigate("/admin/estates");
        }).catch(async (err) => {
          //delete the estate(set fetch for delete the estate)
          const url = "/admin/estates/" + mintId;// again here there is no id and this will not work
          let { response } = await fetchInstance(url, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          });
          //show error --> mintId already exist , just admin can mint estate
        })
      }
      else {
        navigate("/admin/estates");
      }
    }

    if ((response.status = 404)) {
      setError(true);
      setMintUsed(false);
    }

    setLoading(false);
  };

  const deleteHandler = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signers = provider.getSigner();
    if(!signers._address){
      //show error please connect or install your metamask
    }

    //authorized the admin wallet
    let { res } = await fetchInstance("url for authorize", {
      // method: method,
      // body: formData,
    });
    if(res.status==400 || res.staus==403){
      
    }else{
      //put every thing in here
    }

    const proceed = window.confirm("Are you Sure?");
    if (proceed) {
      //blockchain proccess
      
      const mintId = Number(information.id);
      burn(mintId, signers).then(async(burnRes) => {
        const estateId = estate._id;
        const url = "/admin/estates/" + estateId;
        let { response } = await fetchInstance(url, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          setDeleteConfirmed(true);
        }
      }).catch((err) => {
        //just admin can burn the estate
      })
    }
  };

  const idManipulataionHandler = async (name) => {
    setTouched((prev) => ({
      ...prev,
      cityName: true,
      countryName: true,
    }));

    const formData = new FormData();
    formData.append("cityName", name);
    formData.append("countryName", information.countryName);
    let { response, data } = await fetchInstance("/admin/generateMint", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      setInformation((prev) => ({ ...prev, id: data.data }));
    }
  };

  const handleMultiSelectChange = (filters) => {
    setSelectedFilters(filters);
  };

  const addToFacilityLocation = () => {
    if (facilityLocation.length < 3) {
      setFacilityLocation((prev) => [
        ...prev,
        { title: information.facilityLocation, input: "", childList: [] },
      ]);
      setInformation((prev) => ({ ...prev, facilityLocation: "" }));
    }
  };

  const deleteFromFacilityLocation = (title) => {
    let array = facilityLocation.filter((item) => item.title !== title);
    setFacilityLocation(array);
  };

  const addToFacilityLocationItems = (index, event) => {
    let oldValues = [...facilityLocation];
    oldValues[index].childList.push(facilityLocation[index].input);
    oldValues[index].input = "";
    console.log(oldValues);
    setFacilityLocation(oldValues);
  };

  const deleteFromFacilityLocationItems = (index, deletingItem, event) => {
    let array = [...facilityLocation];
    let itemsArray = array[index].childList.filter(
      (item) => item !== deletingItem
    );
    array[index].childList = itemsArray;
    setFacilityLocation(array);
  };

  const editFacilityLocationItem = (index, facilityLocation) => {
    setFacilityLocation((prev) => [
      ...prev,
      (prev[index].input = facilityLocation),
    ]);
    deleteFromFacilityLocationItems(index, facilityLocation);
    facilityLocationRef.current[index].focus();
  };

  return (
    <>
      {detailBox && (
        <div className={styles.infoOvelay}>
          <div className={styles.summryInfo}>
            <div className={styles.WarningDiv}>
              <h4>
                <strong>This is awarning.</strong>You should do something about
                it
              </h4>
              <img src={warningIcon} className={styles.warningIcon} />
            </div>
            <h5>
              -apartment: If it was an apartment house, the desired house floor
              + house unit number
            </h5>
            <h5>
              -private house: If it was a private house, we would briefly write
              the important features of the house, for example, it is near the
              subway or it is close to important centers,...
            </h5>
            <h5>
              -house in nature: If the house was in the nature, I will briefly
              write the nearest centers that this house has access to, such as
              recreational, commercial, and health centers,...
            </h5>
            <h5>-You can only enter 34 characters</h5>
            <button
              className={styles.okBtn}
              onClick={() => setDetailBox(false)}
            >
              ok
            </button>
          </div>
        </div>
      )}
      <form method={method} encType="multipart/form-data">
        {deleteConfirmed && (
          <Alert
            lineColor="#0aff0e"
            img={trueLogo}
            title="Success!"
            detail="Estate has been successfully deleted"
            closeHandler={() => {
              navigate("/admin/estates");
            }}
          />
        )}

        <div className={styles.EstateInfo}>
          <MultiSelect
            options={filters}
            onChange={handleMultiSelectChange}
            selectedOptions={selectedFilters}
            invalid={filterIsInvalid}
          />
          {/* <select
            value={information.filter}
            onChange={basicEventHandler}
            name="filter"
            className={filterClass}
            onBlur={blurHandler}
          >
            <option value="">Choose an option</option>
           
            {filters.map((option) => (
              <option key={option.filterName} value={option.filtername}>
                {option.filterName}
              </option>
            ))}
          </select> */}

          <div className={styles.wrapper}>
            <div className={styles.inputData}>
              <input
                required
                type="text"
                className={titleClass}
                value={information.title}
                name="title"
                onChange={basicEventHandler}
                onBlur={blurHandler}
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
              <div className={styles.countryNameClass2}>
                <select
                  value={information.countryName}
                  onChange={basicEventHandler}
                  name="countryName"
                  className={countryNameClass}
                  onBlur={blurHandler}
                >
                  <option value="">Choose an option</option>
                  {countries.length > 0 &&
                    countries.map((option) => (
                      <option
                        key={option.country_name}
                        value={option.country_name}
                      >
                        {option.country_name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className={styles.column2}>
              <div>
                <label>City</label>
              </div>
              <div className={styles.countryNameClass2}>
                <select
                  value={information.cityName}
                  onChange={basicEventHandler}
                  name="cityName"
                  className={cityNameClass}
                  onBlur={blurHandler}
                >
                  <option value="">Choose an option</option>
                  {cities.length > 0 &&
                    cities.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.column}>
              <div className={styles.wrapper2}>
                <div className={styles.inputData}>
                  <input
                    required
                    type="text"
                    className={numberOfPlateClass}
                    value={information.numberOfPlate}
                    name="numberOfPlate"
                    onChange={basicEventHandler}
                    onBlur={blurHandler}
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
                    required
                    type="text"
                    className={numberOfFloorClass}
                    value={information.numberOfFloor}
                    onChange={basicEventHandler}
                    name="numberOfFloor"
                    onBlur={blurHandler}
                  />
                  <div className={styles.underline}></div>
                  <label className={styles.label}>Number Of Floors</label>
                </div>
              </div>
              <div className={styles.wrapper2}>
                <div className={styles.inputData}>
                  <input
                    required
                    type="text"
                    className={numberOfUnitClass}
                    value={information.numberOfUnit}
                    onChange={basicEventHandler}
                    name="numberOfUnit"
                    onBlur={blurHandler}
                  />
                  <div className={styles.underline}></div>
                  <label className={styles.label}>Number Of Unit</label>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.IdAndWallet}>
            <div className={styles.IdAndMint}>
              <div className={styles.wrapper4}>
                <div className={styles.inputData}>
                  <input
                    required
                    type="number"
                    className={idClass}
                    value={information.id}
                    // onChange={basicEventHandler}
                    name="id"
                    disabled
                    placeholder="Id"
                    onBlur={blurHandler}
                  />
                  <div className={styles.underline}></div>
                  {/* <label className={styles.label}>Id</label> */}
                </div>
              </div>
            </div>

            <div className={styles.IdAndMint}>
              <div className={styles.wrapper4}>
                <div className={styles.inputData}>
                  <input
                    required
                    type="number"
                    className={walletAddressClass}
                    // onChange={basicEventHandler}
                    name="walletAddress"
                    disabled
                    placeholder="walletAddress"
                    onBlur={blurHandler}
                  />
                  <div className={styles.underline}></div>
                  {/* <label className={styles.label}>Id</label> */}
                </div>
              </div>
              <button
                className={styles.ConnectWalletBtn}
              >
                connectWallet
              </button>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.column}>
              <div className={styles.wrapper2}>
                <div className={styles.inputData}>
                  <input
                    required
                    type="text"
                    className={locationClass}
                    value={information.location}
                    onChange={basicEventHandler}
                    name="location"
                    onBlur={blurHandler}
                  />
                  <div className={styles.underline}></div>
                  <label className={styles.label}>Location Of Estate</label>
                </div>
              </div>
            </div>

            <div className={styles.column}>
              <div className={styles.wrapper2}>
                <div className={styles.inputData}>
                  <input
                    required
                    type="number"
                    className={mahamPriceClass}
                    value={information.mahamPrice}
                    onChange={basicEventHandler}
                    name="mahamPrice"
                    onBlur={blurHandler}
                  />
                  <div className={styles.underline}></div>
                  <label className={styles.label}>Maham price</label>
                </div>
              </div>
              {!estate && (
                <div className={styles.wrapper2}>
                  <div className={styles.inputData}>
                    <input
                      required
                      type="number"
                      className={customerPriceClass}
                      value={information.customerPrice}
                      onChange={basicEventHandler}
                      name="customerPrice"
                      onBlur={blurHandler}
                    />
                    <div className={styles.underline}></div>
                    <label className={styles.label}>Customer Price</label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.PropertyInformation}>
          <div className={styles.PropertyInformationHead}>
            <h3>Property Information</h3>
          </div>
          <div className={styles.select2}>
            <select
              value={information.type}
              onChange={basicEventHandler}
              name="type"
              className={typeClass}
              onBlur={blurHandler}
            >
              <option value="">Choose an Property type</option>
              <option value="residential">residential</option>
              <option value="commercial">commercial</option>
            </select>
          </div>

          <div className={styles.row}>
            <div className={styles.column}>
              <div className={styles.wrapper2}>
                <div className={styles.inputData}>
                  <input
                    required
                    type="text"
                    className={streetNameClass}
                    value={information.streetName}
                    onChange={basicEventHandler}
                    name="streetName"
                    onBlur={blurHandler}
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
                    required
                    type="text"
                    className={plateClass}
                    value={information.plate}
                    onChange={basicEventHandler}
                    name="plate"
                    onBlur={blurHandler}
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
                    required
                    type="text"
                    className={buildingNameClass}
                    value={information.buildingName}
                    onChange={basicEventHandler}
                    name="buildingName"
                    onBlur={blurHandler}
                  />
                  <div className={styles.underline}></div>
                  <label className={styles.label}>Building name</label>
                </div>
              </div>
            </div>

            <div className={styles.column}>
              <div className={styles.wrapper2}>
                <div className={styles.inputData}>
                  <input
                    required
                    type="text"
                    className={builtYearClass}
                    value={information.builtYear}
                    onChange={basicEventHandler}
                    name="builtYear"
                    onBlur={blurHandler}
                  />
                  <div className={styles.underline}></div>
                  <label className={styles.label}>Year Build</label>
                </div>
              </div>
              {!estate && (
                <div className={styles.wrapper2}>
                  <div className={styles.inputData}>
                    <input
                      required
                      type="number"
                      className={propertyStyleClass}
                      value={information.propertyStyle}
                      onChange={basicEventHandler}
                      name="propertyStyle"
                      onBlur={blurHandler}
                    />
                    <div className={styles.underline}></div>
                    <label className={styles.label}>Property style</label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/*  */}
        <div className={locationStyles.LocationSet}>
          <div className={locationStyles.LocationSetHead}>
            <h3>location Title</h3>
          </div>

          {facilityLocation.length < 3 && (
            <div className={locationStyles.Locationwrapper}>
              <div className={locationStyles.inputData}>
                <input
                  type="text"
                  className={locationStyles.textinput}
                  value={information.facilityLocation}
                  name="facilityLocation"
                  onChange={basicEventHandler}
                />
                <div className={locationStyles.underline}></div>
                <label className={locationStyles.label}>Title</label>
              </div>
              <button
                type="button"
                className={locationStyles.AddBtn}
                onClick={addToFacilityLocation}
              >
                +
              </button>
            </div>
          )}

          <div className={locationStyles.LocationBody}>
            <div className={locationStyles.LocationFullHead}>
              {facilityLocation.map((item, index) => (
                <div className={locationStyles.LocationHead}>
                  <h5 className={locationStyles.title}>{item.title}</h5>
                  <img
                    src={deleteIcon2}
                    className={locationStyles.DeleteIcon}
                    onClick={() => deleteFromFacilityLocation(item.title)}
                  />
                  <div className={locationStyles.InputDiv}>
                    <div className={locationStyles.inputContainer}>
                      <input
                        type="text"
                        id={index}
                        value={item.input}
                        className={locationStyles.inputs}
                        onChange={(event) =>
                          facilityLocationEventHandler(index, event)
                        }
                        ref={(element) =>
                          (facilityLocationRef.current[index] = element)
                        }
                      />
                      <label className={locationStyles.label} htmlFor={index}>
                        <div className={locationStyles.text}>Location</div>
                      </label>
                    </div>
                    <span
                      onClick={(event) =>
                        addToFacilityLocationItems(index, event)
                      }
                    >
                      +
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className={locationStyles.LocationSection}>
              {facilityLocation.map((parentItem, parentIndex) => (
                <div className={locationStyles.SectionBody}>
                  <div className={locationStyles.Section}>
                    {/* <div className={locationStyles.LocationEdit}> */}
                    {parentItem.childList.map((item, index) => (
                      <div className={locationStyles.InputDiv}>
                        {index + 1}-
                        <div className={locationStyles.inputContainer}>
                          <input
                            type="text"
                            value={item}
                            className={locationStyles.inputs}
                            disabled
                          />
                          <label className={locationStyles.label}>
                            <div className={locationStyles.text}>Location</div>
                          </label>
                        </div>
                        <img
                          src={deleteIcon2}
                          className={locationStyles.DeleteIcon}
                          onClick={(event) =>
                            deleteFromFacilityLocationItems(
                              parentIndex,
                              item,
                              event
                            )
                          }
                        />
                        <img
                          src={editIcon}
                          className={locationStyles.EditIcon}
                          onClick={(event) =>
                            editFacilityLocationItem(parentIndex, item, event)
                          }
                        />
                      </div>
                    ))}
                    {/* </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div className={styles.RoomAndMetarge}>
          <h3>Romms And Metrages</h3>

          <div className={styles.Row3}>
            <table className={styles.styledTable}>
              <tbody>
                <tr>
                  <td>
                    <div className={styles.checkbox_wrapper}>
                      <input
                        required
                        type="checkbox"
                        id="check1"
                        name="checked"
                        checked={bedroom.checked}
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
                  {bedroom.checked && (
                    <>
                      <td>
                        <label htmlFor="Number">Number:</label>
                        <input
                          required
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
                          required
                          type="number"
                          name="metrage"
                          min="0"
                          id="Metrage"
                          className={styles.Inputs}
                          value={bedroom.metrage}
                          onChange={bedroomEventHandler}
                        />
                      </td>
                    </>
                  )}
                </tr>
                <tr>
                  <td>
                    <div className={styles.checkbox_wrapper}>
                      <input
                        required
                        type="checkbox"
                        id="check2"
                        name="checked"
                        checked={livingRoom.checked}
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
                  {livingRoom.checked && (
                    <>
                      <td>
                        <label htmlFor="Number">Number:</label>
                        <input
                          required
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
                          required
                          type="number"
                          name="metrage"
                          min="0"
                          id="Metrage"
                          className={styles.Inputs}
                          value={livingRoom.metrage}
                          onChange={livingRoomEventHandler}
                        />
                      </td>
                    </>
                  )}
                </tr>
                <tr>
                  <td>
                    <div className={styles.checkbox_wrapper}>
                      <input
                        required
                        type="checkbox"
                        id="check3"
                        name="checked"
                        checked={kitchen.checked}
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
                  {kitchen.checked && (
                    <>
                      <td>
                        <label htmlFor="Number">Number:</label>
                        <input
                          required
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
                          required
                          type="number"
                          name="metrage"
                          min="0"
                          id="Metrage"
                          className={styles.Inputs}
                          value={kitchen.metrage}
                          onChange={kitchenEventHandler}
                        />
                      </td>
                    </>
                  )}
                </tr>
                <tr>
                  <td>
                    <div className={styles.checkbox_wrapper}>
                      <input
                        required
                        type="checkbox"
                        id="check4"
                        name="checked"
                        checked={diningroom.checked}
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
                  {diningroom.checked && (
                    <>
                      <td>
                        <label htmlFor="Number">Number:</label>
                        <input
                          required
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
                          required
                          type="number"
                          name="metrage"
                          min="0"
                          id="Metrage"
                          className={styles.Inputs}
                          value={diningroom.metrage}
                          onChange={diningroomEventHandler}
                        />
                      </td>
                    </>
                  )}
                </tr>
                <tr>
                  <td>
                    <div className={styles.checkbox_wrapper}>
                      <input
                        required
                        type="checkbox"
                        id="check5"
                        name="checked"
                        checked={guestroom.checked}
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
                  {guestroom.checked && (
                    <>
                      <td>
                        <label htmlFor="Number">Number:</label>
                        <input
                          required
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
                          required
                          type="number"
                          name="metrage"
                          min="0"
                          id="Metrage"
                          className={styles.Inputs}
                          value={guestroom.metrage}
                          onChange={guestroomEventHandler}
                        />
                      </td>
                    </>
                  )}
                </tr>
                <tr>
                  <td>
                    <div className={styles.checkbox_wrapper}>
                      <input
                        required
                        type="checkbox"
                        id="check6"
                        name="checked"
                        checked={bathroom.checked}
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
                  {bathroom.checked && (
                    <>
                      <td>
                        <label htmlFor="Number">Number:</label>
                        <input
                          required
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
                          required
                          type="number"
                          name="metrage"
                          min="0"
                          id="Metrage"
                          className={styles.Inputs}
                          value={bathroom.metrage}
                          onChange={bathroomEventHandler}
                        />
                      </td>
                    </>
                  )}
                </tr>
                <tr>
                  <td>
                    <div className={styles.checkbox_wrapper}>
                      <input
                        required
                        type="checkbox"
                        id="check7"
                        name="checked"
                        checked={garden.checked}
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
                  {garden.checked && (
                    <>
                      <td>
                        <label htmlFor="Number">Number:</label>
                        <input
                          required
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
                          required
                          type="number"
                          name="metrage"
                          min="0"
                          id="Metrage"
                          className={styles.Inputs}
                          value={garden.metrage}
                          onChange={gardenEventHandler}
                        />
                      </td>
                    </>
                  )}
                </tr>
                <tr>
                  <td>
                    <div className={styles.checkbox_wrapper}>
                      <input
                        required
                        type="checkbox"
                        id="check8"
                        name="checked"
                        checked={balcony.checked}
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
                  {balcony.checked && (
                    <>
                      <td>
                        <label htmlFor="Number">Number:</label>
                        <input
                          required
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
                          required
                          type="number"
                          name="metrage"
                          min="0"
                          id="Metrage"
                          className={styles.Inputs}
                          value={balcony.metrage}
                          onChange={balconyEventHandler}
                        />
                      </td>
                    </>
                  )}
                </tr>
                <tr>
                  <td>
                    <div className={styles.checkbox_wrapper}>
                      <input
                        required
                        type="checkbox"
                        id="check9"
                        name="checked"
                        checked={garage.checked}
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
                  {garage.checked && (
                    <>
                      <td>
                        <label htmlFor="Number">Number:</label>
                        <input
                          required
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
                          required
                          type="number"
                          name="metrage"
                          min="0"
                          id="Metrage"
                          className={styles.Inputs}
                          value={garage.metrage}
                          onChange={garageEventHandler}
                        />
                      </td>
                    </>
                  )}
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
                        required
                        type="checkbox"
                        id="check10"
                        name="wifi"
                        checked={facilities.wifi}
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
                        required
                        type="checkbox"
                        id="check11"
                        name="parking"
                        checked={facilities.parking}
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
                        required
                        type="checkbox"
                        id="check12"
                        name="pool"
                        checked={facilities.pool}
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
                        required
                        type="checkbox"
                        id="check13"
                        name="furniture"
                        checked={facilities.furniture}
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
                        required
                        type="checkbox"
                        id="check14"
                        name="elevator"
                        checked={facilities.elevator}
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
                        required
                        type="checkbox"
                        id="check15"
                        name="garden"
                        checked={facilities.garden}
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
                        required
                        type="checkbox"
                        id="check16"
                        name="laundary"
                        checked={facilities.laundary}
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
                        required
                        type="checkbox"
                        id="check17"
                        name="bbq"
                        checked={facilities.bbq}
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
                        required
                        type="checkbox"
                        id="check18"
                        name="gym"
                        checked={facilities.gym}
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
            {/*  */}
            <div className={styles.DescriptionInfo}>
              <h4>Summary for estate</h4>
              <img
                className={styles.attentionIcon}
                src={attentionIcon}
                onClick={() => setDetailBox(true)}
              />
              <p>{information.summary.length}/34</p>
            </div>
            <div className={styles.DescriptionDiv}>
              <textarea
                placeholder="please read information"
                name="summary"
                value={information.summary}
                onChange={basicEventHandler}
                className={summaryClass}
                onBlur={blurHandler}
              ></textarea>
            </div>
            {/*  */}
            <h3>Description of Estate</h3>
            <div className={styles.DescriptionDiv}>
              <textarea
                placeholder="description"
                name="description"
                value={information.description}
                onChange={basicEventHandler}
                className={descriptionClass}
                onBlur={blurHandler}
              ></textarea>
            </div>
          </div>
        </div>

        <div className={styles.Uploader}>
          <div className={styles.ImgUploader}>
            <h3>Image Uploader</h3>
            <div className={styles.UploadDiv}>
              <input
                required
                type="file"
                id="file-input"
                name="imageInput"
                multiple
                hidden
                accept="image/*"
                className={styles.fileInput}
                onChange={imgHandler}
              />
            </div>
            <div className={imageClass} id="preview-container">
              {previewImages.length > 0 && (
                <div>
                  {previewImages.length > 0 &&
                    previewImages.map((imageURL) => (
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
                required
                type="file"
                className={styles.fileInput2}
                id="file-input2"
                multiple
                accept="video/*"
                hidden
                onChange={vidHandler}
              />
            </div>
            <div className={videoClass} id="preview-container2">
              {selectedVideo.length == 0 && (
                <div id="UploadIcon" className={styles.uploadIcon}>
                  <div>
                    <img src={uploadIcon} className={styles.UploadIcon2} />
                  </div>
                  <div>
                    <h3>Uploade Image and Show photos</h3>
                  </div>
                </div>
              )}

              {selectedVideo.length > 0 && (
                <div>
                  {previewUrl.length > 0 &&
                    previewUrl.map((vidURL) => (
                      <video
                        key={vidURL}
                        src={vidURL}
                        alt="Preview"
                        width="200"
                        controls
                      />
                    ))}
                </div>
              )}
            </div>
            <label htmlFor="file-input2" className={styles.ChooseLabel}>
              Choose Video
            </label>
          </div>
          <div className={styles.AddAndDelete}>
            <button
              className={styles.AddButton}
              // disabled={!formIsValid}
              type="button"
              onClick={() => submitHandler()}
            >
              {estate ? (
                <>
                  <span className={styles.text}>Edit</span>
                  <span>+</span>
                </>
              ) : (
                <>
                  <span className={styles.text}>Add</span>
                  <span>+</span>
                </>
              )}
            </button>
            {estate && (
              <button
                className={styles.DeleteBtn}
                type="button"
                onClick={() => deleteHandler()}
              >
                <span className={styles.text}>Delete</span>
                <span>
                  <img src={deleteIcon} className={styles.DeleteIcon}></img>
                </span>
              </button>
            )}
          </div>
        </div>
      </form>
      {loading && <div>loading...</div>}
    </>
  );
};

export default ConfingEstate;
