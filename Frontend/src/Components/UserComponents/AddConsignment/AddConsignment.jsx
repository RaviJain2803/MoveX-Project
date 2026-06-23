import "./AddConsignment.css";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  __categoryapiurl,
  __consignmentapiurl,
  __subcategoryapiurl,
} from "../../../API_URL";
import axios from "axios";

const AddConsignment = () => {
  // const email = localStorage.getItem("email");

  //add
  const user = JSON.parse(localStorage.getItem("user"));

  const email = user?.email;

  const name = user?.name;

  const mobile = user?.mobile;

  const address = user?.address;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    pickup_location: "",
    destination: "",
    description: "",
  });

  const [categories, setCategories] = useState([]);

  const [subCategories, setSubCategories] = useState([]);

  // CATEGORY LOAD

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await axios.get(__categoryapiurl + "fetch");

      setCategories(res.data.data || res.data.categoryList || []);
    } catch (error) {
      console.log(error);

      toast.error("Unable to load categories");
    }
  };

  // SUBCATEGORY LOAD

  useEffect(() => {
    if (!formData.category) return;

    loadSubCategory();
  }, [formData.category]);

  const loadSubCategory = async () => {
    try {
      const res = await axios.get(
        __subcategoryapiurl + "fetch",

        {
          params: {
            catnm: formData.category,
          },
        },
      );

      setSubCategories(res.data.subCategoryList || []);
    } catch (error) {
      console.log(error);

      setSubCategories([]);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { category, subcategory, pickup_location, destination, description } =
      formData;

    if (
      !category ||
      !subcategory ||
      !pickup_location ||
      !destination ||
      !description
    ) {
      toast.error("All fields required");

      return;
    }

    try {
      setLoading(true);

      const payload = {
        email,
        name,
        mobile,
        address,
        category,
        subcategory,
        pickup_location,
        destination,
        description,
      };

      const res = await axios.post(
        __consignmentapiurl + "save",

        payload,
      );

      toast.success(res.data.message);

      setFormData({
        category: "",

        subcategory: "",

        pickup_location: "",

        destination: "",

        description: "",
      });

      setSubCategories([]);
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Booking Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="consignment-container">
      <div className="consignment-card">
        <div className="left-section">
          <h2>Create Consignment</h2>

          <form onSubmit={handleSubmit}>
            <div className="group">
              <label>Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>

                {categories.map((item) => (
                  <option key={item._id} value={item.catnm}>
                    {item.catnm}
                  </option>
                ))}
              </select>
            </div>

            <div className="group">
              <label>Sub Category</label>

              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
              >
                <option value="">Select</option>

                {subCategories.map((item) => (
                  <option key={item._id} value={item.subcatnm}>
                    {item.subcatnm}
                  </option>
                ))}
              </select>
            </div>

            <div className="group">
              <label>Pickup</label>

              <input
                name="pickup_location"
                value={formData.pickup_location}
                onChange={handleChange}
              />
            </div>

            <div className="group">
              <label>Destination</label>

              <input
                name="destination"
                value={formData.destination}
                onChange={handleChange}
              />
            </div>

            <div className="group">
              <label>Description</label>

              <textarea
                rows="5"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <button className="submit-btn" disabled={loading}>
              {loading ? "Creating..." : "Book Now"}
            </button>
          </form>
        </div>

        <div className="preview">
          <h3>Booking Preview</h3>

          <p>
            Category:
            <b>{formData.category || "-"}</b>
          </p>

          <p>
            Service:
            <b>{formData.subcategory || "-"}</b>
          </p>

          <p>
            Pickup:
            <b>{formData.pickup_location || "-"}</b>
          </p>

          <p>
            Destination:
            <b>{formData.destination || "-"}</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddConsignment;
