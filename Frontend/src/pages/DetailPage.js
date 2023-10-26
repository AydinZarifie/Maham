import styles from "../styles/Details.module.css";

import fetchInstance from "../util/fetchInstance";

import leftArrowIcon from "../images/black-arrow-sm-left-svgrepo-com.svg";
import heartIcon from "../images/heart-svgrepo-com.svg";
import shareIcon from "../images/share-svgrepo-com.svg";
import chartIcon from "../images/chart-1-svgrepo-com.svg";
import bedIcon from "../images/bed-svgrepo-com.svg";
import bathtubIcon from "../images/bathtub-svgrepo-com.svg";
import metrageIcon from "../images/arrow-increase-svgrepo-com.svg";
import attentionIcon from "../images/attention-svgrepo-com.svg";
import warningIcon from "../images/warning-attention-svgrepo-com.svg";
import recieptIcon from "../images/reciept-svgrepo-com.svg";
import wifiIcon from "../images/wifi-outline-svgrepo-com.svg";
import facilitiesIcon from "../images/home-add-angle-svgrepo-com.svg";
import trueIcon from "../images/tick-svgrepo-com (3).svg";
import falseIcon from "../images/close-svgrepo-com.svg";
import parkingIcon from "../images/parking-svgrepo-com.svg";
import furnitureIcon from "../images/couch-furniture-svgrepo-com.svg";
import elevatorIcon from "../images/elevator-1-svgrepo-com.svg";
import gardenIcon from "../images/plant-house-svgrepo-com.svg";
import laundryIcon from "../images/laundry-svgrepo-com.svg";
import bbqIcon from "../images/bbq-grill-svgrepo-com.svg";
import gymIcon from "../images/gym-workout-svgrepo-com.svg";
import calendarIcon from "../images/calendar-svgrepo-com.svg";
import buildingIcon1 from "../images/building-02-svgrepo-com.svg";
import buildingIcon2 from "../images/building-svgrepo-com.svg";
import CustomTableItem from "../components/general/CustomTableItem";
import poolIcon from "../images/pool-svgrepo-com (2).svg";
import ArrowUpIcon from "../images/arrow-down-svgrepo-com.svg";
import PropertyInfoIcon from "../images/inbox-information-svgrepo-com.svg"
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/general/Navbar";

const DetailPage = () => {
  const [approverBox, setApproverBox] = useState(false);
  const [pmBox, setPmBox] = useState(false);
  const [gallery, setGallery] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [features, setFeatures] = useState(false);

  const featuresRef = useRef();

  const toggleFeatures = () => {
    let div=document.getElementById("InteriorFeaturesBody");
    let size=div.scrollHeight;
    console.log(size);
    if (features) {
      featuresRef.current.style.height = "308px";
      setFeatures(false);
    } else {
      featuresRef.current.style.height = (size+98) + "px";
      setFeatures(true);
    }
  };

  const slider = useRef(null);

  const goToRight = () => {
    var scrollx = slider.current.scrollLeft;
    var scrollx2 = slider.current.clientWidth;
    var scrollx3 = slider.current.scrollWidth;

    if (scrollx + scrollx2 >= scrollx3 - 1) {
      // rightButton.current.style.opacity = ".2";
      slider.current.scrollBy({
        left: -slider.current.scrollWidth,
      });
    } else {
      // rightButton.current.style.opacity = "1";
      slider.current.scrollBy({
        left: slider.current.offsetWidth,
      });
    }
  };

  const goToLeft = () => {
    var scrollx = slider.current.scrollLeft;

    if (scrollx > 0) {
      // leftButton.current.style.opacity = "1";
      slider.current.scrollBy({
        left: -slider.current.offsetWidth,
      });
    } else {
      // leftButton.current.style.opacity = ".2";
      slider.current.scrollBy({
        left: slider.current.scrollWidth,
      });
    }
  };

  const [scrolledDown, setScrolledDown] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const size = document.getElementById("localInfo");

      if (window.scrollY > size.offsetTop) {
        setScrolledDown(true);
      }else {
        setScrolledDown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={styles.Menu}>
        <Navbar />
      </div>

      {scrolledDown && (
        <div className={styles.BuyMenu}>
          <div className={styles.TitleForMenu}>
            <h4>Bech home in ohaio 123</h4>
            <h5>united state_california</h5>
          </div>

          <div className={styles.BuyAndPrice}>
            <div className={styles.PriceAndIcon}>
              <h4>1234 ETh</h4>
              <div className={styles.MenuIconsDiv}>
                <span>
                  <img className={styles.HeadMenuIcon} src={heartIcon} />
                  save
                </span>
                <span>
                  <img className={styles.HeadMenuIcon} src={shareIcon} />
                  share
                </span>
              </div>
            </div>
            <button className={styles.MenuBuyBtn}>Buy</button>
          </div>
        </div>
      )}

      <div className={styles.HeadDiv}>
        <div className={styles.Column1}>
          <div className={styles.BackInfo}>
            <Link to="/" className={styles.BackDiv}>
              <img src={leftArrowIcon} className={styles.ArrowIcon} />
              <h5>back</h5>
            </Link>
            <div className={styles.HeadInfo}>
              <h5>
                For sale &gt; Residential &gt; united state &gt; california
              </h5>
            </div>
          </div>
          <div className={styles.IconsDiv}>
            <span>
              <img className={styles.HeadIcon} src={heartIcon} />
              save
            </span>
            <span>
              <img className={styles.HeadIcon} src={shareIcon} />
              share
            </span>
            <span>
              <img className={styles.HeadIcon} src={chartIcon} />
              chart
            </span>
          </div>
        </div>
        <div className={styles.HeadInfo2}>
          <h5>For sale &gt; Residential &gt; united state &gt; california</h5>
        </div>

        <div className={styles.GalleryDiv}>
          <div className={styles.ImageDivB} onClick={() => setGallery(true)}>
            <img src="../public/img/4925.jpg" />
          </div>
          <div className={styles.ImageDivL} onClick={() => setGallery(true)}>
            <img src="../public/img/4918.jpg" />
            <img src="../public/img/5904.jpg" />
          </div>
        </div>
        <div className={styles.slider} ref={slider}>
          <img src="../public/img/4925.jpg" onClick={() => setGallery(true)} />
          <img src="../public/img/4918.jpg" onClick={() => setGallery(true)} />
          <img src="../public/img/5904.jpg" onClick={() => setGallery(true)} />
          <div className={styles.buttons}>
            <button className={styles.RLBtn} onClick={goToLeft}>
              ❮
            </button>
            <button className={styles.RLBtn} onClick={goToRight}>
              ❯
            </button>
          </div>
        </div>

        <div className={styles.TitleAndBuyDiv}>
          <div className={styles.TitleDiv}>
            <span className={styles.TitleSpan}>
              <h3 className={styles.TitleH3}>
                <div className={styles.ScrolingText}>
                  Glass building in Dubai
                </div>
              </h3>
              <h3>376 ETH</h3>
            </span>
            <h4>174 kilimeters dubai sea in the</h4>
            <a href="#Description">read more</a>
            <div className={styles.IconsDiv}>
              <div className={styles.IconDiv}>
                <img className={styles.Icon} src={bedIcon} />3 beds
              </div>
              <div className={styles.IconDiv}>
                <img className={styles.Icon} src={bathtubIcon} />2 beds
              </div>
              <div className={styles.IconDiv}>
                <img className={styles.Icon} src={metrageIcon} />
                473 sq. ft
              </div>
            </div>
          </div>
          <div className={styles.BuyDiv}>
            <span className={styles.AddressSpan}>
              <h6 className={styles.LandLordTitle}>Landlord Address:</h6>
              <span className={styles.AddressDiv}>
                {/* <div className={styles.numberContainer}>
                  <div className={styles.HoverDiv}>
                    <div className={styles.FullNumber}>
                      <p className={styles.FullNumberP}>
                        3454567890123456345456789012345634545678901234563454567890123456
                      </p>
                    </div>
                    <div className={styles.CopyBox}>Copy</div>
                  </div>
                  <span className={styles.partialNumber}>
                    <p
                      className={styles.AddressP}
                      onmouseover="Visible()"
                      onmouseout="Hidden()"
                    >
                      1092100478...
                    </p>
                    <img
                      src="../public/img/copy-documents-duplicate-svgrepo-com.svg"
                      className={`${styles.CopyIcon} ${styles.copyIconBuySection}`}
                      onClick="copyNumber()"
                      onmouseover="Visible2()"
                      onmouseout="Hidden2()"
                    />
                    <img
                      src="../public/img/tick-svgrepo-com (2).svg"
                      className={`${styles.CopyIcon2} ${styles.copyIconBuySection}`}
                      onmouseover="Visible3()"
                      onmouseout="Hidden3()"
                    />
                  </span>
                </div> */}
                <CustomTableItem text="3141592653589793238462643383279502884197169399375105820974944592" />
              </span>
            </span>
            <span className={styles.ApproverAndPM}>
              <span className={styles.ApproverAndPMSpan}>
                <h5>Approver :</h5>
                <h5>true</h5>
                <img
                  src={attentionIcon}
                  className={styles.attentionIcon}
                  onClick={() => setApproverBox(true)}
                />
              </span>
              <span className={styles.ApproverAndPMSpan}>
                <h5>P/M :</h5>
                <h5>1.96</h5>
                <img
                  src={attentionIcon}
                  className={styles.attentionIcon}
                  onClick={() => setPmBox(true)}
                />
              </span>
            </span>
            <span className={styles.PriceInfo}>
              <h5>Price/m^2 :</h5>
              <h5>0.32 ETH</h5>
            </span>
            <button className={styles.BuyBtn}>Buy</button>
            <h5 className={styles.TaxisH5}>
              The house purchase and sale tax laws in the UAE are not mentioned
              here, the money the buyer pays or vice versa
            </h5>
          </div>
        </div>

        {(approverBox || pmBox) && (
          <div
            className={styles.ApproverAndPMOverlay}
            onClick={() => {
              setApproverBox(false);
              setPmBox(false);
            }}
          ></div>
        )}

        {pmBox && (
          <div className={styles.PMDescription}>
            <div className={styles.CloseDiv} onClick={() => setPmBox(false)}>
              &times;
            </div>
            <div className={styles.WarningDiv}>
              <h4>
                <strong>This is a warning.</strong>You should do something about
                it
              </h4>
              <img src={warningIcon} className={styles.warningIcon} />
            </div>
            <p>
              The concept of p over m is something that offers a fair price
              comparison to the buyer, p is the price that the seller determines
              and m is the price that Mahm's experts set, respecting the rights
              of the buyer and fair, now whatever this number is 0 The price of
              the house is good for the buyer, but if this number is much larger
              than 1, the price set by the seller is not a good price according
              to the experts.
            </p>
          </div>
        )}

        {approverBox && (
          <div className={styles.ApproverDescription}>
            <div
              className={styles.CloseDiv}
              onClick={() => setApproverBox(false)}
            >
              &times;
            </div>
            <div className={styles.WarningDiv}>
              <h4>
                <strong>This is awarning.</strong>You should do something about
                it
              </h4>
              <img src={warningIcon} className={styles.warningIcon} />
            </div>
            <span>
              <h5>Approver Addres :</h5>
              <h5 className={styles.ApproverAddres}>
                1234567891234567891234567891234512345678912345678912345678912345
              </h5>
            </span>

            <p>
              An approver is a person who has a lot of power like a property
              owner, such as selling a house or... when the approver is true, it
              means that such a person exists, and his address is also written
              on the top of the description, otherwise, there is no such person.
            </p>
          </div>
        )}

        <div className={styles.LocalInfo} id="localInfo">
          <h3>Local Information</h3>
          <div className={styles.Buttons}>
            <button>Map</button>
            <button>School</button>
            <button>Shop & eat</button>
          </div>
          <iframe
            className={styles.GoogleMap}
            src="https://www.google.com/maps"
          ></iframe>
        </div>
        <div className={styles.Description} id="Description">
          <h3>Description</h3>
          <p>
            This house is located in a high-class neighborhood in the southeast
            of Dubai city, which is close to large commercial stores, hospitals
            and schools. This house is also in a good security situation because
            of its high-level security team. The building has 21 floors and each
            floor has 3 units, and the exterior of this building is made of
            glass, which makes the building even more beautiful. This building
            is 234 meters long and has a large lobby for welcoming special
            guests, a special club for the people of the building. There is, on
            the last floor there is also a cozy place for rest and relaxation
            where you can watch the whole city.
          </p>
        </div>
        <div className={styles.InteriorFeatures} ref={featuresRef}>
          <div className={styles.SectionHead}>
            <img src={recieptIcon} className={styles.SectionHeadIcon} />
            <h3>Interior Features</h3>
          </div>
          <div className={styles.InteriorFeaturesBody} id="InteriorFeaturesBody" >
            <div className={styles.InteriorFeaturesSections}>
              <h5>
                <img src={buildingIcon1} className={styles.PropertyIcon} />
                bedrooms
              </h5>
              <span className={styles.PropertySpan2}>
                <span>
                  &#8226;
                  <h5>Number of bedrooms:</h5>
                  <h5>3</h5>
                </span>

                <span>
                  &#8226;
                  <h5>Metrage :</h5>
                  <h5>24 m^2</h5>
                </span>
              </span>
            </div>
            <div className={styles.InteriorFeaturesSections}>
              <h5>
                <img src={buildingIcon2} className={styles.PropertyIcon} />
                Bathrooms
              </h5>
              <span className={styles.PropertySpan2}>
                <span>
                  &#8226;
                  <h5>Number of bathrooms :</h5>
                  <h5>1</h5>
                </span>

                <span>
                  &#8226;
                  <h5>metrage :</h5>
                  <h5>43 m^2</h5>
                </span>
              </span>
            </div>
            <div className={styles.InteriorFeaturesSections}>
              <h5>
                <img src={buildingIcon2} className={styles.PropertyIcon} />
                Bathrooms
              </h5>
              <span className={styles.PropertySpan2}>
                <span>
                  &#8226;
                  <h5>Number of bathrooms :</h5>
                  <h5>1</h5>
                </span>

                <span>
                  &#8226;
                  <h5>metrage :</h5>
                  <h5>43 m^2</h5>
                </span>
              </span>
            </div>
            <div className={styles.InteriorFeaturesSections}>
              <h5>
                <img src={buildingIcon2} className={styles.PropertyIcon} />
                Bathrooms
              </h5>
              <span className={styles.PropertySpan2}>
                <span>
                  &#8226;
                  <h5>Number of bathrooms :</h5>
                  <h5>1</h5>
                </span>

                <span>
                  &#8226;
                  <h5>metrage :</h5>
                  <h5>43 m^2</h5>
                </span>
              </span>
            </div>
            {!features && (
              <div className={styles.ShowAllDiv}>
                <button onClick={toggleFeatures} className={styles.ShowAllBtn}>
                  Show all
                </button>
              </div>
            )}

            {features && (
              <div className={styles.ArrowUp}
              onClick={toggleFeatures}>
                 close <h4>&times;</h4>
                {/* <img
                  
                  src={ArrowUpIcon}
                  className={styles.ArrowUpIcon}
                /> */}
               
              </div>
            )}
          </div>
        </div>

        <div className={styles.Facilities}>
          <div className={styles.SectionHead}>
            <img src={facilitiesIcon} className={styles.SectionHeadIcon} />
            <h3>Facilities</h3>
          </div>
          <div className={styles.FacilitiesContainer}>
            <div className={styles.facilitiesOption}>
              <div className={styles.facilitiesOptionSide1}>
                <img src={wifiIcon} className={styles.FacilitiesIcon} />
                <h4>Wifi</h4>
              </div>
              <img src={trueIcon} className={styles.FacilitiesIcon} />
            </div>
            <div className={styles.facilitiesOption}>
              <div className={styles.facilitiesOptionSide1}>
                <img src={parkingIcon} className={styles.FacilitiesIcon} />

                <h4>Parking</h4>
              </div>
              <img src={trueIcon} className={styles.FacilitiesIcon} />
            </div>
            <div className={styles.facilitiesOption}>
              <div className={styles.facilitiesOptionSide1}>
                <img src={poolIcon} className={styles.FacilitiesIcon} />

                <h4>Pool</h4>
              </div>
              <img src={falseIcon} className={styles.FacilitiesIcon} />
            </div>
            <div className={styles.facilitiesOption}>
              <div className={styles.facilitiesOptionSide1}>
                <img src={furnitureIcon} className={styles.FacilitiesIcon} />
                <h4>Furniture</h4>
              </div>
              <img src={trueIcon} className={styles.FacilitiesIcon} />
            </div>
            <div className={styles.facilitiesOption}>
              <div className={styles.facilitiesOptionSide1}>
                <img src={elevatorIcon} className={styles.FacilitiesIcon} />
                <h4>Elevator</h4>
              </div>
              <img src={falseIcon} className={styles.FacilitiesIcon} />
            </div>
            <div className={styles.facilitiesOption}>
              <div className={styles.facilitiesOptionSide1}>
                <img src={gardenIcon} className={styles.FacilitiesIcon} />
                <h4>Garden</h4>
              </div>
              <img src={trueIcon} className={styles.FacilitiesIcon} />
            </div>
            <div className={styles.facilitiesOption}>
              <div className={styles.facilitiesOptionSide1}>
                <img src={laundryIcon} className={styles.FacilitiesIcon} />
                <h4>Laundry</h4>
              </div>
              <img src={falseIcon} className={styles.FacilitiesIcon} />
            </div>
            <div className={styles.facilitiesOption}>
              <div className={styles.facilitiesOptionSide1}>
                <img src={bbqIcon} className={styles.FacilitiesIcon} />
                <h4>BbQ</h4>
              </div>

              <img src={trueIcon} className={styles.FacilitiesIcon} />
            </div>
            <div className={styles.facilitiesOption}>
              <div className={styles.facilitiesOptionSide1}>
                <img src={gymIcon} className={styles.FacilitiesIcon} />
                <h4>Gym</h4>
              </div>
              <img src={trueIcon} className={styles.FacilitiesIcon} />
            </div>
          </div>
        </div>

        <div className={styles.PropertyInfo}>
        <div className={styles.SectionHead}>
            <img src={PropertyInfoIcon} className={styles.SectionHeadIcon} />
            <h3>Property Information</h3>
          </div>
          <div className={styles.PropertyBody}>
            <div className={styles.propertySections}>
              <h5>
                <img src={calendarIcon} className={styles.PropertyIcon} />
                Year Built
              </h5>
              <span className={styles.PropertySpan}>
                &#8226;
                <h5>Year Built :</h5>
                <h5>1998</h5>
              </span>
            </div>
            <hr className={styles.PropertyHr1} />
            <div className={styles.propertySections}>
              <h5>
                <img src={buildingIcon1} className={styles.PropertyIcon} />
                Property Type/Style
              </h5>
              <span className={styles.PropertySpan2}>
                <span>
                  &#8226;
                  <h5>Property Type :</h5>
                  <h5>residental</h5>
                </span>

                <span>
                  &#8226;
                  <h5>Property Style :</h5>
                  <h5>Apartment</h5>
                </span>
              </span>
            </div>
            <hr className={styles.PropertyHr2} />
            <div className={styles.propertySections}>
              <h5>
                <img src={buildingIcon2} className={styles.PropertyIcon} />
                Building
              </h5>
              <span className={styles.PropertySpan2}>
                <span>
                  &#8226;
                  <h5>Building name :</h5>
                  <h5>Khalifah</h5>
                </span>

                <span>
                  &#8226;
                  <h5>Plate :</h5>
                  <h5>25 Sheikh</h5>
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className={styles.Transactions}>
          <h3>Transactions</h3>

          <div className={styles.TableDiv}>
            <table className={styles.InfoTable}>
              <thead>
                <tr>
                  <th>tx Hash</th>
                  <th>Method</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Value</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <CustomTableItem text="3141592653589793238462643383279502884197169399375105820974944592" />
                    {/* <span className={styles.AddressDiv}>
                      <div className={styles.numberContainer}>
                        <div className={styles.HoverDiv}>
                          <div className={styles.FullNumberTable}>
                            <p className={styles.FullNumberP}>
                              1234567891234567891234567891234512345678912345678912345678912345
                            </p>
                          </div>
                        </div>
                        <span className={styles.partialNumber}>
                          <p
                            onmouseover="VisibleTable()"
                            onmouseout="HiddenTable()"
                            className={styles.AddressTable}
                          >
                            0x88109473...
                          </p>
                        </span>
                      </div>
                    </span> */}
                  </td>
                  <td>
                    <div className={styles.MethodDiv}>
                     <div>Transfer</div> 
                      </div>
                  </td>
                  <td>
                    <CustomTableItem text="3141592653589793238462643383279502884197169399375105820974944592" />
                    {/* <span className={styles.AddressDiv}>
                      <div className={styles.numberContainer}>
                        <div className={styles.HoverDiv}>
                          <div className={styles.FullNumberTable}>
                            <p className={styles.FullNumberP}>
                              1234567891234567891234567891234512345678912345678912345678912345
                            </p>
                          </div>
                          <div className={styles.CopyBox}>Copy</div>
                        </div>
                        <span className={styles.partialNumber}>
                          <p
                            onmouseover="VisibleTable()"
                            onmouseout="HiddenTable()"
                            className={styles.AddressTable}
                          >
                            0x921...34719
                          </p>
                          <img
                            src="../public/img/copy-documents-duplicate-svgrepo-com.svg"
                            className={styles.CopyIcon}
                            onClick="copyNumberTable()"
                            onmouseover="Visible2()"
                            onmouseout="Hidden2()"
                          />
                          <img
                            src="../public/img/tick-svgrepo-com (2).svg"
                            className={styles.CopyIcon2}
                            onmouseover="Visible3()"
                            onmouseout="Hidden3()"
                          />
                        </span>
                      </div>
                    </span> */}
                  </td>
                  <td>
                    <CustomTableItem text="3141592653589793238462643383279502884197169399375105820974944592" />
                    {/* <span className={styles.AddressDiv}>
                      <div className={styles.numberContainer}>
                        <div className={styles.HoverDiv}>
                          <div className={styles.FullNumberTable}>
                            <p className={styles.FullNumberP}>
                              1234567891234567891234567891234512345678912345678912345678912345
                            </p>
                          </div>
                          <div className={styles.CopyBox}>Copy</div>
                        </div>
                        <span className={styles.partialNumber}>
                          <p className={styles.AddressTable}>0x921...34719</p>
                          <img
                            src="../public/img/copy-documents-duplicate-svgrepo-com.svg"
                            className={styles.CopyIcon}
                          />
                          <img
                            src="../public/img/tick-svgrepo-com (2).svg"
                            className={styles.CopyIcon2}
                          />
                        </span>
                      </div>
                    </span> */}
                  </td>
                  <td>321 ETH</td>
                  <td>2023/08/21</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {gallery && (
        <>
          <div
            className={styles.GalleryOverlay}
            onClick={() => setGallery(false)}
          ></div>
          <div className={styles.GalleryMain}>
            <div className={styles.Gallery}>
              <div className={styles.GalleryHead}>
                <div className={styles.Side1}>
                  <img
                    src={leftArrowIcon}
                    className={styles.BackIcon}
                    onClick={() => setGallery(false)}
                  />
                  <div className={styles.GalleryButtons}>
                    <button>Map</button>
                    <button>School</button>
                    <button>Shop & eat</button>
                  </div>
                </div>
                <div className={styles.Side2}>
                  <span>
                    <img className={styles.HeadIcon2} src={heartIcon} />
                    save
                  </span>
                  <span>
                    <img className={styles.HeadIcon2} src={shareIcon} />
                    share
                  </span>
                </div>
              </div>

              <div className={styles.PhotosDiv}>
                <div className={styles.OnePhotoDiv}>
                  <img
                    onClick={() => setFullscreen(true)}
                    src="../public/img/4925.jpg"
                  />
                </div>
                <div className={styles.OnePhotoDiv}>
                  <img src="../public/img/4918.jpg" />
                </div>
                <div className={styles.OnePhotoDiv}>
                  <img src="../public/img/5904.jpg" />
                </div>
                <div className={styles.OnePhotoDiv}>
                  <img src="../public/img/4925.jpg" />
                </div>
                <div className={styles.OnePhotoDiv}>
                  <img src="../public/img/4918.jpg" />
                </div>
                <div className={styles.OnePhotoDiv}>
                  <img src="../public/img/5904.jpg" />
                </div>
                <div className={styles.OnePhotoDiv}>
                  <img src="../public/img/4925.jpg" />
                </div>
                <div className={styles.OnePhotoDiv}>
                  <img src="../public/img/4918.jpg" />
                </div>
                <div className={styles.OnePhotoDiv}>
                  <img src="../public/img/5904.jpg" />
                </div>
              </div>

              {fullscreen && (
                <>
                  <div
                    className={styles.ImageOverlay}
                    onClick={() => setFullscreen(false)}
                    id="overlay"
                  >
                    <span className={styles.closeButton}>
                      <div onClick={() => setFullscreen(false)}>&times;</div>
                    </span>
                  </div>
                  <img className={styles.OneImage} src="" alt="" />
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DetailPage;

// async function loadEstate(id) {
//   const response = await fetch("http://localhost:8080/estates/" + id);

//   if (!response.ok) {
//     throw json(
//       { message: "Could not fetch details for selected estate." },
//       {
//         status: 500,
//       }
//     );
//   } else {
//     const resData = await response.json();
//     return resData.event;
//   }
// }

export async function loader({ request, params }) {
  const id = params.estateId;
  let { response, data } = await fetchInstance("/admin/estates/" + id);
  return data;
  // return loadEstate(id);
}
