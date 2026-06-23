import "./AddCategory.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { __categoryapiurl } from "../../../API_URL";
import { useState } from "react";

const AddCategory = () => {

  const navigate = useNavigate();

  // Message display
  const [output, setOutput] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    catnm: "",
    description: "",
    status: true,
  });

  // Uploaded file
  const [file, setFile] = useState(null);

  // Image preview
  const [preview, setPreview] = useState(null);

  // Handle text fields and status toggle
  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle image upload
  const handleImage = (e) => {

    const selectedFile = e.target.files[0];

    setFile(selectedFile);

    // Show image preview
    if (selectedFile) {
      setPreview(
        URL.createObjectURL(selectedFile)
      );
    }
  };

  // Submit form
  const handleSubmit = async (e) => {

    e.preventDefault();

    // Validation
    if (!formData.catnm.trim() || !file) {

      setOutput(
        "Category Name and Icon are required"
      );
       setIsSuccess(false);

      setTimeout(() => {
        setOutput("");
      }, 3000);

      return;
    }

    // Create multipart form data
    const formdata = new FormData();

    formdata.append(
      "catnm",
      formData.catnm
    );

    formdata.append(
      "description",
      formData.description
    );

    formdata.append(
      "status",
      formData.status
    );

    formdata.append(
      "caticon",
      file
    );

    try {

      const response = await axios.post(

        __categoryapiurl + "save",

        formdata,

        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setOutput(response.data.message);
       setIsSuccess(true);
        // Auto hide after 3 sec
  setTimeout(() => {
    setOutput("");
  }, 3000);

      // Reset form after success
      setFormData({
        catnm: "",
        description: "",
        status: true,
      });

      setFile(null);

      setPreview(null);

      // Optional redirect
      navigate("/addcategory");

    } catch (error) {

      setOutput(error?.response?.data?.message ||"Unable to add category");

       setIsSuccess(false);

  // Auto hide after 3 sec
  setTimeout(() => {
    setOutput("");
  }, 3000);
    }
  };

  return (

    <div className="add-category-container">

      <div className="add-category-card">

        {/* Left Form Section */}

        <div className="form-section">

          <h2>Add New Category</h2>

                  {
            output && (
              <p
                style={{
                  color: isSuccess ? "green" : "red",
                  marginBottom: "15px",
                  fontWeight: "600",
                }}
              >
                {output}
              </p>
            )
          }

          <form onSubmit={handleSubmit}>

            {/* Category Name */}

            <div className="form-group">

              <label>Category Name</label>

              <input
                type="text"
                name="catnm"
                value={formData.catnm}
                onChange={handleChange}
                placeholder="Enter category name"
              />

            </div>

            {/* Description */}

            <div className="form-group">

              <label>Description</label>

              <textarea
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter category description"
              />

            </div>

            {/* Category Icon */}

            <div className="form-group">

              <label>Category Icon</label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
              />

            </div>

            {/* Status Toggle */}

            <div className="status-row">

              <label>Status</label>

              <label className="switch">

                <input
                  type="checkbox"
                  name="status"
                  checked={formData.status}
                  onChange={handleChange}
                />

                <span className="slider"></span>

              </label>

              <span>
                {formData.status
                  ? "Active"
                  : "Inactive"}
              </span>

            </div>

            <button
              type="submit"
              className="submit-btn"
            >
              Add Category
            </button>

          </form>

        </div>

        {/* Preview Section */}

        <div className="preview-section">

          <h3>Preview</h3>

          <div className="preview-card">

            {
              preview ? (
                <img
                  src={preview}
                  alt="preview"
                />
              ) : (
                <div className="image-placeholder">
                  No Image
                </div>
              )
            }

            <h4>
              {
                formData.catnm ||
                "Category Name"
              }
            </h4>

            <p>
              {
                formData.description ||
                "Category description will appear here"
              }
            </p>

            <span
              className={
                formData.status
                  ? "status active"
                  : "status inactive"
              }
            >
              {
                formData.status
                  ? "Active"
                  : "Inactive"
              }
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AddCategory;