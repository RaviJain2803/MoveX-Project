import "./ViewSubCategory.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { __subcategoryapiurl } from "../../../API_URL";

function ViewSubCategoryUser() {
  const { cnm } = useParams();

  const [subcategoryList, setSubCategoryList] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubCategory();
  }, [cnm]);

  const fetchSubCategory = async () => {
    try {
      console.log("Param cnm =", cnm);
      console.log("URL = ", __subcategoryapiurl + "fetch");

      const response = await axios.get(
        __subcategoryapiurl + "fetch",

        {
          params: {
            catnm: cnm,
          },
        },
      );

      console.log("API Response =", response.data);

      setSubCategoryList(response.data.subCategoryList || []);
    } catch (error) {
      console.log("API ERROR =", error);

      setSubCategoryList([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = subcategoryList.filter((row) =>
    row.subcatnm

      ?.toLowerCase()

      .includes(search.toLowerCase()),
  );

  return (
    <div className="subcategory-page">
      <div className="subcategory-header">
        <h1>{cnm}</h1>

        <p>Choose your preferred service</p>

        <input
          type="text"
          placeholder="Search Sub Category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="subcategory-search"
        />
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="subcategory-grid">
          {filteredData.length ? (
            filteredData.map((row) => (
              <div key={row._id} className="subcategory-card">
                <div className="subcategory-image">
                  <img
                    src={`/uploads/subcaticons/${row.subcaticonnm}`}
                    alt={row.subcatnm}
                  />
                </div>

                <div className="subcategory-content">
                  <h3>{row.subcatnm}</h3>

                  <p>Professional shifting services</p>

                  <button>Explore</button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty">No Sub Categories Found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default ViewSubCategoryUser;
