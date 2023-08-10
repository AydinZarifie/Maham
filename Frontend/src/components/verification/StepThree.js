import styles from "../../styles/verification.module.css";

import { useState } from "react";

import validPassportIcon from "../../images/IMG_0008.PNG";
import validPassportWithPersonIcon from "../../images/IMG_0010.PNG";
import attentionIcon from "../../images/attention-circle-svgrepo-com.svg";
import warningIcon from "../../images/warning-attention-svgrepo-com.svg";
import imageIcon from "../../images/image-svgrepo-com_1.svg";
import deletetIcon from "../../images/delete-2-svgrepo-com.svg";

const StepThree = (props) => {
  const [selectedImages, setSelectedImages] = useState(
    props.data
  );
  const [previewImages, setPreviewImages] = useState(
    selectedImages.length > 0
      ? selectedImages.map((file) => URL.createObjectURL(file))
      : []
  );
  const [dragging, setDragging] = useState(false);
  const [touched, setTouched] = useState(false);

  const enteredImageIsValid = selectedImages.length == 2;

  const imageIsInvalid = !enteredImageIsValid && touched;

  const imgHandler = (event) => {
    event.preventDefault();
    setDragging(false);
    const data =
      event.type == "drop" ? event.dataTransfer.files : event.target.files;
    if (data.length > 0 && data.length <= 2) {
      if (selectedImages.length + data.length > 2) {
        return;
      }
      const selectedFiles = Array.from(data);
      let flag = false;

      selectedFiles.forEach((file) => {
        if (!file.type.startsWith("image/")) {
          // alert('Please select an image file.');
          // event.target.value = null;
          flag = true;
          return;
        }
      });

      if (!flag) {
        // event.target.value=null
        const allSelectedFiles = [...selectedImages, ...selectedFiles];
        setSelectedImages(allSelectedFiles);

        const previewURLs = allSelectedFiles.map((file) =>
          URL.createObjectURL(file)
        );
        setPreviewImages(previewURLs);
      }
    }
  };

  const deleteImgHandler = () => {
    setSelectedImages([]);
    setPreviewImages([]);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    // event.currentTarget.classList.add(styles.dragging);
    setDragging(true);
  };

  const handleDragLeave = (event) => {
    // event.currentTarget.classList.remove(styles.dragging);
    setDragging(false);
  };

  const submitHandler = () => {
    
    setTouched(true);
    if (selectedImages.length != 2) {
      return;
    }
    props.onSubmit(selectedImages);
  };

  const imageClass = imageIsInvalid
    ? `${styles.invalid} ${styles.dropzone} `
    : `${styles.dropzone} `;

  return (
    <div className={styles.Information}>
      <h2>submit Document</h2>
      <h4 className={styles.InfoH4}>we need to verify your information.</h4>
      <h4 className={styles.InfoH4}>
        Please submit the documents below to process your application.
      </h4>
      <div className={styles.InfoBody}>
        <div className={styles.PictureDiv}>
          <h3 className={styles.PictureDivH3}>Take a photo</h3>
          <span className={styles.passportAndTake}>
            <h4 className={styles.passportAndTakeH4}>1-Passport</h4>
            <span className={styles.IconAndInfo}>
              <img
                className={styles.PassportAndTakeIcon}
                src={validPassportIcon}
              />
              <span className={styles.PassportAndTakeInfoSpan}>
                <span className={styles.Pspan}>
                  &#8226;
                  <p>
                    plese make sure all of the 4 corners are Included in your
                    photo.
                  </p>
                </span>
                <span className={styles.Pspan}>
                  &#8226;
                  <p>please make sure passport s flattend</p>
                </span>
              </span>
            </span>
          </span>

          <span className={styles.passportAndTake}>
            <h4 className={styles.passportAndTakeH4}>2-Take a photo</h4>
            <span className={styles.IconAndInfo}>
              <img
                className={styles.PassportAndTakeIcon}
                src={validPassportWithPersonIcon}
              />
              <span className={styles.PassportAndTakeInfoSpan}>
                <span className={styles.Pspan}>
                  &#8226;
                  <p>Passport is held close to your face.</p>
                </span>
                <span className={styles.Pspan}>
                  &#8226;
                  <p>Fingers not covering any numbers,text or photos.</p>
                </span>
                <span className={styles.Pspan}>
                  &#8226;
                  <p>
                    Face and passport must be visible and clear, not blurry.
                  </p>
                </span>
              </span>
            </span>
          </span>
        </div>
        <div className={styles.DocumentDiv}>
          <h3 className={styles.DocumentH3}>Add Documents</h3>
          <div className={styles.AlertDocument}>
            <img src={attentionIcon} className={styles.AttentionIcon} />
            <p>
              The passport information must be related to the person to whom the
              document is issued
            </p>
          </div>
          <div className={styles.Alert2Document}>
            <img src={warningIcon} className={styles.Attention2Icon} />
            <p>If the documents are invalid, they will be rejected</p>
          </div>
          <div>
            <input
              type="file"
              id="fileinput"
              className={styles.fileinput}
              accept="image/*"
              multiple
              onChange={imgHandler}
            />
            <label for="fileinput">
              <div
                className={`${imageClass}  ${dragging ? styles.dragging : ""}`}
                // onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragEnter}
                onDrop={imgHandler}
              >
                {selectedImages.length == 0 && (
                  <div className={styles.dropzoneP}>
                    <img src={imageIcon} className={styles.GalleryIcon} />
                    Drop Image Here or Click to select a file!
                    <p>Supports: JPG, JPEG2000, PNG</p>
                  </div>
                )}

                <div className={styles.gallery}>
                  {previewImages.map((img) => (
                    <img key={img} src={img} />
                  ))}
                </div>
              </div>
            </label>
            {selectedImages.length > 0 && (
              <button
                className={styles.cleargallery}
                onClick={deleteImgHandler}
              >
                <span className={styles.cleargallerySpan}>
                  <img className={styles.cleargalleryIcon} src={deletetIcon} />
                  Clear Images
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
      <button className={styles.SubmitBtn} onClick={submitHandler}>
        Submit
      </button>
    </div>
  );
};

export default StepThree;
