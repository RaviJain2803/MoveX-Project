import "./ViewSubCategory.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { __subcategoryapiurl } from "../../../API_URL";

function ViewSubCategory() {

  const backendUrl = import.meta.env.VITE_API_URL;

  const [subCategoryData, setSubCategoryData] = useState([]);

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchSubCategory();
  }, []);

  const fetchSubCategory = () => {
    axios

      .get(__subcategoryapiurl + "fetch")

      .then((response) => {
        setSubCategoryData(response.data.subCategoryList || []);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  // EDIT

  const handleEdit = async () => {
    try {
      await axios.patch(
        __subcategoryapiurl + "update",

        {
          condition: {
            _id: editData._id,
          },

          data: {
            catnm: editData.catnm,

            subcatnm: editData.subcatnm,
          },
        },
      );

      alert("Updated");

      fetchSubCategory();

      setEditData(null);
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE

  const handleDelete = async (id) => {
    try {
      console.log("Deleting:", id);

      const response = await axios.delete(
        `${__subcategoryapiurl}delete`,
        {
          params: {
            _id: id,
          },
        },
      );

      console.log(response.data);

      fetchSubCategory();
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  // FILTER

  const filteredData = subCategoryData.filter((row) => {
    const matchSearch = row.subcatnm

      ?.toLowerCase()

      .includes(search.toLowerCase());

    const matchCategory =
      selectedCategory === "All" || row.catnm === selectedCategory;

    return matchSearch && matchCategory;
  });

  return (
    <div className="view-category-container">
      <h1>Manage Sub Categories</h1>

      <div className="filter-row">
        <input
          type="text"
          placeholder="Search Sub Category"
          className="search-box"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>

          {[...new Set(subCategoryData.map((row) => row.catnm))].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {editData && (
        <div className="edit-box">
          <h3>Edit Sub Category</h3>

          <input
            type="text"
            value={editData.catnm}
            onChange={(e) =>
              setEditData({
                ...editData,

                catnm: e.target.value,
              })
            }
          />

          <input
            type="text"
            value={editData.subcatnm}
            onChange={(e) =>
              setEditData({
                ...editData,

                subcatnm: e.target.value,
              })
            }
          />

          <div className="edit-btn-row-1">
            <button onClick={handleEdit}>Update</button>

            <button onClick={() => setEditData(null)}>Cancel</button>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>S.No</th>

            <th>Category</th>

            <th>Sub Category</th>

            <th>Icon</th>

            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.length ? (
            filteredData.map((row, index) => (
              <tr key={row._id}>
                <td>{index + 1}</td>

                <td>{row.catnm}</td>

                <td>{row.subcatnm}</td>

                <td>
                  <img
                    src={`${backendUrl}/uploads/subcaticons/${row.subcaticonnm}`}
                    alt=""
                    className="category-icon"
                  />
                </td>

                <td>
                  <button
                    className="edit-btn-1"
                    onClick={() =>
                      setEditData({
                        ...row,
                      })
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(row._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No Data Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViewSubCategory;
