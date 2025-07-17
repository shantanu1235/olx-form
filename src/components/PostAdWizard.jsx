import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCar, FaHome, FaMobileAlt, FaBriefcase, FaMotorcycle, FaTv, FaTruck,
  FaCouch, FaTshirt, FaBook, FaDog, FaServicestack, FaChevronRight
} from "react-icons/fa";
import "./PostAdWizard.css";

const iconMap = {
  "Cars": <FaCar className="cat-icon" />,
  "Properties": <FaHome className="cat-icon" />,
  "Mobiles": <FaMobileAlt className="cat-icon" />,
  "Jobs": <FaBriefcase className="cat-icon" />,
  "Bikes": <FaMotorcycle className="cat-icon" />,
  "Electronics & Appliances": <FaTv className="cat-icon" />,
  "Commercial Vehicles & Spares": <FaTruck className="cat-icon" />,
  "Furniture": <FaCouch className="cat-icon" />,
  "Fashion": <FaTshirt className="cat-icon" />,
  "Books, Sports & Hobbies": <FaBook className="cat-icon" />,
  "Pets": <FaDog className="cat-icon" />,
  "Services": <FaServicestack className="cat-icon" />,
};

const categories = [
  { name: "Cars", sub: ["For Sale: Houses & Apartments"] },
  {
    name: "Properties",
    sub: [
      "For Sale: Houses & Apartments",
      "For Rent: Houses & Apartments",
      "Lands & Plots",
      "For Rent: Shops & Offices",
      "For Sale: Shops & Offices",
      "PG & Guest Houses",
    ],
  },
  { name: "Mobiles" },
  { name: "Jobs" },
  { name: "Bikes" },
  { name: "Electronics & Appliances" },
  { name: "Commercial Vehicles & Spares" },
  { name: "Furniture" },
  { name: "Fashion" },
  { name: "Books, Sports & Hobbies" },
  { name: "Pets" },
  { name: "Services" },
];

const PostAdWizard = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const selected = categories.find((cat) => cat.name === selectedCategory);

  return (
    <div className="postad-container">
      <h2 className="postad-title" >POST YOUR AD</h2>
      <div className="category-box-wrapper">
        <div className="category-header">CHOOSE A CATEGORY</div>
        <div className="category-flex">
          <div className="category-list">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className={`category-row${selectedCategory === cat.name ? " active" : ""}`}
                onClick={() => setSelectedCategory(cat.name)}
              >
                <span className="cat-icon-wrap">{iconMap[cat.name]}</span>
                <span className="cat-label">{cat.name}</span>
                <FaChevronRight className="cat-arrow" />
              </div>
            ))}
          </div>
          <div className="subcategory-list">
            {selected?.sub?.map((sub, idx) =>
              sub === "For Rent: Houses & Apartments" ? (
                <Link
                  to="/Secondpage"
                  className={`subcategory-row${selectedCategory && selected.sub[idx] === sub ? " active" : ""}`}
                  key={idx}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <FaHome className="subcat-icon" />
                  <span className="subcat-label">{sub}</span>
                </Link>
              ) : (
                <div
                  className={`subcategory-row${selectedCategory && selected.sub[idx] === sub ? " active" : ""}`}
                  key={idx}
                >
                  <FaHome className="subcat-icon" />
                  <span className="subcat-label">{sub}</span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostAdWizard;