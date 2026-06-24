import "./AddSubCategory.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { __categoryapiurl, __subcategoryapiurl } from "../../../API_URL";

function AddSubCategory() {
  const navigate = useNavigate();

  const [output, setOutput] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  const [categoryList, setCategoryList] = useState([]);

  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    catnm: "",
    subcatnm: "",
    status: true,
  });

  const [file, setFile] = useState(null);

  useEffect(() => {
    axios
      .get(__categoryapiurl + "fetch")

      .then((response) => {
        setCategoryList(response.data.data);
      })

      .catch(() => {
        setOutput("Unable to load categories");

        setIsSuccess(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,

      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];

    setFile(selectedFile);

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.catnm || !formData.subcatnm.trim() || !file) {
      setOutput("All fields are required");

      setIsSuccess(false);

      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("catnm", formData.catnm);

      data.append("subcatnm", formData.subcatnm);

      data.append("status", formData.status);

      data.append("caticon", file);

      const response = await axios.post(
        __subcategoryapiurl + "save",

        data,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setOutput(response.data.message);

      setIsSuccess(true);

      setFormData({
        catnm: "",
        subcatnm: "",
        status: true,
      });

      setFile(null);

      setPreview(null);

      setTimeout(() => {
        setOutput("");
      }, 3000);

      navigate("/addsubcategory");
    } catch (error) {
      setOutput(error?.response?.data?.message || "Sub Category not added");

      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-sub-container">
      <div className="add-sub-card">
        <div className="sub-form">
          <h2>Add Sub Category</h2>

          {output && (
            <p className={isSuccess ? "success" : "error"}>{output}</p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Category</label>

              <select
                name="catnm"
                value={formData.catnm}
                onChange={handleChange}
              >
                <option value="">Select Category</option>

                {categoryList.map((row) => (
                  <option key={row._id} value={row.catnm}>
                    {row.catnm}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Sub Category</label>

              <input
                type="text"
                name="subcatnm"
                value={formData.subcatnm}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Icon</label>

              <input type="file" accept="image/*" onChange={handleFile} />
            </div>

            <div className="status-row">
              <label>Status</label>

              <label className="switch">
                <input
                  type="checkbox"
                  name="status"
                  checked={formData.status}
                  onChange={handleChange}
                />

                <span className="slider" />
              </label>
            </div>

            <button className="submit-btn">
              {loading ? "Adding..." : "Add Sub Category"}
            </button>
          </form>
        </div>

        <div className="preview-section">
          <h3>Preview</h3>

          <div className="preview-card">
            {preview ? (
              <img src={preview} alt="" />
            ) : (
              <div className="placeholder">No Image</div>
            )}

            <h4>{formData.subcatnm || "Sub Category"}</h4>

            <p>{formData.catnm || "Selected Category"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSubCategory;
