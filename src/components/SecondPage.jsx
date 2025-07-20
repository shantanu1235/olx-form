import React, { useState } from "react";
import { TbCameraPlus } from "react-icons/tb";
import { Link } from 'react-router-dom';
import "./SecondPage.css";

const ADTITLE_MAX = 70;
const DESCRIPTION_MAX = 4500;
const NAME_MAX = 30;

const SecondPage = () => {
  const [photos, setPhotos] = useState(Array(20).fill(null)); // <-- make photos stateful
  const [state, setState] = useState("");
  const [form, setForm] = useState({
    type: "",
    bhk: "",
    bathrooms: "",
    furnishing: "",
    listedBy: "",
    superArea: "",
    carpetArea: "",
    bachelors: "",
    price: "",
    adTitle: "",
    description: "",
    name: "",
  });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleInput = (field, value) => {
    // Enforce max length for specific fields
    if (field === "adTitle" && value.length > ADTITLE_MAX) return;
    if (field === "description" && value.length > DESCRIPTION_MAX) return;
    if (field === "name" && value.length > NAME_MAX) return;
    setForm({ ...form, [field]: value });
  };


  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };



  const validate = () => {
    const errors = {};
    if (!form.type) errors.type = "Type is required";
    if (!form.bhk) errors.bhk = "BHK is required";
    if (!form.bathrooms) errors.bathrooms = "Bathrooms is required";
    if (!form.furnishing) errors.furnishing = "Furnishing is required";
    if (!form.listedBy) errors.listedBy = "Listed by is required";
    if (!form.superArea) errors.superArea = "Super Builtup area is required";
    if (!form.carpetArea) errors.carpetArea = "Carpet area is required";
    if (!form.bachelors) errors.bachelors = "Bachelors Allowed is required";
    if (!form.price) errors.price = "Price is required";
    if (!form.adTitle) errors.adTitle = "Ad Title is required";
    if (form.adTitle && form.adTitle.length > ADTITLE_MAX)
      errors.adTitle = `Ad Title must be at most ${ADTITLE_MAX} characters`;
    if (!form.description) errors.description = "Description is required";
    if (form.description && form.description.length > DESCRIPTION_MAX)
      errors.description = `Description must be at most ${DESCRIPTION_MAX} characters`;
    if (!state) errors.state = "State is required";
    if (!form.name) errors.name = "Name is required";
    if (form.name && form.name.length > NAME_MAX)
      errors.name = `Name must be at most ${NAME_MAX} characters`;
    return errors;
  };

  const errors = validate();
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTouched({
      type: true,
      bhk: true,
      bathrooms: true,
      furnishing: true,
      listedBy: true,
      superArea: true,
      carpetArea: true,
      bachelors: true,
      price: true,
      adTitle: true,
      description: true,
      state: true,
      name: true,
    });
    if (isValid) {
      // Submit logic here
    }
  };

  const fileInputRef = React.useRef(null);

  const handlePhotoBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePhotoChange = (files) => {
    if (!files || files.length === 0) return;
    const newPhotos = [...photos];
    let photoIndex = 0;
    // Find the first empty slot
    while (photoIndex < newPhotos.length && newPhotos[photoIndex]) {
      photoIndex++;
    }

    let loaded = 0;
    const total = Math.min(files.length, 20 - photoIndex);

    Array.from(files).slice(0, total).forEach((file, i) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPhotos[photoIndex + i] = reader.result;
        loaded++;
        if (loaded === total) {
          setPhotos(newPhotos);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    
    <div>
         <h2>POST YOUR AD</h2>
    <div className="form-container">
   

      {/* Category Section */}
      <div className="section">
        <div className="selected-category">
          <strong>SELECTED CATEGORY</strong>
          <p className="pera">
            Properties / For Rent: Houses & Apartments{" "}
            <Link to="/" className="link3">change</Link>
          </p>
        </div>
      </div>

      {/* Details Section */}
      <form onSubmit={handleSubmit}>
        <div className="section">
          <h3>INCLUDE SOME DETAILS</h3>
          <div className="form-row">
            <div className="form-col">
              <label>Type *</label>
              <div className="button-group">
                {["Flat / Apartments", "Independent / Builder Floors", "Individual House / Villa"].map((type) => (
                  <button
                    type="button"
                    key={type}
                    className={form.type === type ? "selected" : ""}
                    onClick={() => handleInput("type", type)}
                    onBlur={() => handleBlur("type")}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {((touched.type || submitted) && errors.type) && (
                <div className="error">{errors.type}</div>
              )}

              <label>BHK *</label>
              <div className="button-group">
                {[1, 2, 3, 4, "4+"].map((n) => (
                  <button
                    type="button"
                    key={n}
                    className={form.bhk === String(n) ? "selected" : ""}
                    onClick={() => handleInput("bhk", String(n))}
                    onBlur={() => handleBlur("bhk")}
                  >
                    {n}
                  </button>
                ))}
              </div>
              {((touched.bhk || submitted) && errors.bhk) && (
                <div className="error">{errors.bhk}</div>
              )}

              <label>Bathrooms *</label>
              <div className="button-group">
                {[1, 2, 3, 4, "4+"].map((n) => (
                  <button
                    type="button"
                    key={n}
                    className={form.bathrooms === String(n) ? "selected" : ""}
                    onClick={() => handleInput("bathrooms", String(n))}
                    onBlur={() => handleBlur("bathrooms")}
                  >
                    {n}
                  </button>
                ))}
              </div>
              {((touched.bathrooms || submitted) && errors.bathrooms) && (
                <div className="error">{errors.bathrooms}</div>
              )}

              <label>Furnishing *</label>
              <div className="button-group">
                {["Furnished", "Semi-Furnished", "Unfurnished"].map((furnishing) => (
                  <button
                    type="button"
                    key={furnishing}
                    className={form.furnishing === furnishing ? "selected" : ""}
                    onClick={() => handleInput("furnishing", furnishing)}
                    onBlur={() => handleBlur("furnishing")}
                  >
                    {furnishing}
                  </button>
                ))}
              </div>
              {((touched.furnishing || submitted) && errors.furnishing) && (
                <div className="error">{errors.furnishing}</div>
              )}
            </div>
            <div className="form-col">
              <label>Listed by *</label>
              <div className="button-group">
                {["Builder", "Dealer", "Owner"].map((listedBy) => (
                  <button
                    type="button"
                    key={listedBy}
                    className={form.listedBy === listedBy ? "selected" : ""}
                    onClick={() => handleInput("listedBy", listedBy)}
                    onBlur={() => handleBlur("listedBy")}
                  >
                    {listedBy}
                  </button>
                ))}
              </div>
              {((touched.listedBy || submitted) && errors.listedBy) && (
                <div className="error">{errors.listedBy}</div>
              )}
<input
  type="text"
  placeholder="Super Builtup area sqft *"
  value={form.superArea}
  onChange={e => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) { // ✅ Allow only numbers
      handleInput("superArea", value);
    }
  }}
  onBlur={() => handleBlur("superArea")}
  required
/>

              {((touched.superArea || submitted) && errors.superArea) && (
                <div className="error">{errors.superArea}</div>
              )}

              <input
                type="text"
                placeholder="Carpet Area sqft *"
                value={form.carpetArea}
                onChange={e => {
                  const value=e.target.value
                   if (/^\d*$/.test(value)) { 
                    handleInput("carpetArea",value)
                   }
                }
                  
                }
                onBlur={() => handleBlur("carpetArea")}
                required
              />
              {((touched.carpetArea || submitted) && errors.carpetArea) && (
                <div className="error">{errors.carpetArea}</div>
              )}

              <label>Bachelors Allowed *</label>
              <div className="button-group">
                {["No", "Yes"].map((bachelors) => (
                  <button
                    type="button"
                    key={bachelors}
                    className={form.bachelors === bachelors ? "selected" : ""}
                    onClick={() => handleInput("bachelors", bachelors)}
                    onBlur={() => handleBlur("bachelors")}
                  >
                    {bachelors}
                  </button>
                ))}
              </div>
              {((touched.bachelors || submitted) && errors.bachelors) && (
                <div className="error">{errors.bachelors}</div>
              )}

              <input
                type="text"
                placeholder="Maintenance (Monthly)"
                value={form.maintenance || ""}
                onChange={e => {
                  const value=e.target.value
                   if (/^\d*$/.test(value)) { 
                    handleInput("maintenance",value)
                   }
                }
                  
                }
              />
              <input
                type="text"
                placeholder="Total Floors"
                value={form.totalFloors || ""}
              onChange={e => {
                  const value=e.target.value
                   if (/^\d*$/.test(value)) { 
                    handleInput("totalFloors",value)
                   }
                }
                  
                }
              />
              <input
                type="text"
                placeholder="Floor No"
                value={form.floorNo || ""}
                onChange={e => {
                  const value=e.target.value
                   if (/^\d*$/.test(value)) { 
                    handleInput("floorNo",value)
                   }
                }
                  
                }
              />

              <label>Car Parking</label>
              <div className="button-group">
                {[0, 1, 2, 3, "3+"].map((n) => (
                  <button
                    type="button"
                    key={n}
                    className={form.carParking === String(n) ? "selected" : ""}
                    onClick={() => handleInput("carParking", String(n))}
                  >
                    {n}
                  </button>
                ))}
              </div>

              <label>Facing</label>
              <select
                value={form.facing || ""}
                onChange={e => handleInput("facing", e.target.value)}
              >
                <option value="">Select Facing</option>
                <option>East</option>
                <option>West</option>
                <option>North</option>
                <option>South</option>
              </select>
            </div>
          </div>
          <input
            type="text"
            placeholder="Project Name"
            value={form.projectName || ""}
            onChange={e => handleInput("projectName", e.target.value)}
          />
          <div className="input-with-count" style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Ad Title *"
              maxLength={ADTITLE_MAX}
              value={form.adTitle}
              onChange={e => handleInput("adTitle", e.target.value)}
              onBlur={() => handleBlur("adTitle")}
              required
            />
            <span className="char-count">
              {form.adTitle.length} / {ADTITLE_MAX}
            </span>
          </div>
          {((touched.adTitle || submitted) && errors.adTitle) && (
            <div className="error">{errors.adTitle}</div>
          )}
          <div className="input-with-count" style={{ position: "relative" }}>
            <textarea
              placeholder="Description *"
              maxLength={DESCRIPTION_MAX}
              value={form.description}
              onChange={e => handleInput("description", e.target.value)}
              onBlur={() => handleBlur("description")}
              required
            />
            <span className="char-count">
              {form.description.length} / {DESCRIPTION_MAX}
            </span>
          </div>
          {((touched.description || submitted) && errors.description) && (
            <div className="error">{errors.description}</div>
          )}
        </div>

        {/* Price Section */}
        <div className="section2">
          <h3>SET A PRICE</h3>
          <input
            type="text"
            placeholder="Price *"
            value={form.price}
           onChange={e => {
                  const value=e.target.value
                   if (/^\d*$/.test(value)) { 
                    handleInput("price",value)
                   }
                }
                  
                }
            onBlur={() => handleBlur("price")}
            required
          />
          {((touched.price || submitted) && errors.price) && (
            <div className="error">{errors.price}</div>
          )}
        </div>

        {/* Photo Upload Section */}
       <div className="section">
  <h3>UPLOAD UP TO 20 PHOTOS</h3>
  <div className="photo-grid">
    {photos.map((photo, index) => (
      <div
        key={index}
        className="photo-box"
        onClick={handlePhotoBoxClick}
        style={{ cursor: "pointer" }}
      >
        {photo ? (
          <img src={photo} alt={`Photo ${index + 1}`} className="photo-preview" />
        ) : (
          <span>
            <TbCameraPlus className="photo-icon" />
          </span>
        )}
      </div>
    ))}
    <input
      type="file"
      accept="image/*"
      multiple
      style={{ display: "none" }}
      ref={fileInputRef}
      onChange={e => {
        if (e.target.files && e.target.files.length > 0) {
          handlePhotoChange(e.target.files);
        }
      }}
    />
  </div>
  {/* ✅ Hide this message if at least one photo is uploaded */}
  {photos.some(photo => photo !== null) ? null : (
    <small className="mandatory">This field is mandatory</small>
  )}
</div>


        {/* Location Section */}
        <div className="section3">
          <h3>CONFIRM YOUR LOCATION</h3>
          <div className="tab-group">
            <span className="active-tab">LIST</span>
            <span className="inactive-tab">CURRENT LOCATION</span>
          </div>
          <select
            value={state}
            onChange={e => {
              setState(e.target.value);
              handleInput("state", e.target.value);
            }}
            onBlur={() => handleBlur("state")}
            required
          >
            <option value="">Select State *</option>
            <option>Uttar Pradesh</option>
            <option>Maharashtra</option>
            <option>Delhi</option>
          </select>
          {((touched.state || submitted) && errors.state) && (
            <div className="error">{errors.state}</div>
          )}
        </div>

        {/* Review Section */}
        <div className="section">
          <h3>REVIEW YOUR DETAILS</h3>
          <div className="user-details">
            <img
              src="/img/story.avif"
              alt="avatar"
              className="avatar"
            />
            <div>
              <div className="input-with-count" style={{ position: "relative" }}>
                <input
                  type="text"
                  value={form.name}
                  maxLength={NAME_MAX}
                  onChange={e => handleInput("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  placeholder="Jhon"
                  required
                />
                <span className="count1">
                  {form.name.length} / {NAME_MAX}
                </span>
              </div>
              {((touched.name || submitted) && errors.name) && (
                <div className="error">{errors.name}</div>
              )}
              <p>
                Your phone number: <strong>95******11</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Post Button */}
        <div className="section">
          <button className="post-btn" type="submit" disabled={!isValid}>
            Post now
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default SecondPage;