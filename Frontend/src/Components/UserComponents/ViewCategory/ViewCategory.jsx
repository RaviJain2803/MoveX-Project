import "./ViewCategory.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { __categoryapiurl } from "../../../API_URL";

function ViewCategoryUser() {
  const [categoryList, setCategoryList] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(__categoryapiurl + "fetch");

      setCategoryList(response.data.data || response.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = categoryList.filter((row) =>
    row.catnm

      ?.toLowerCase()

      .includes(search.toLowerCase()),
  );

  return (
    <div className="user-category">
      <div className="category-header">
        <h1>Choose Your Service</h1>

        <p>Find the right moving service</p>

        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="category-grid">
          {filteredData.length ? (
            filteredData.map((row) => (
              <Link
                key={row._id}
                to={`/searchsc/${row.catnm}`}
                className="category-link"
              >
                <div className="category-card">
                  <div className="image-box">
                    <img
                      src={`/uploads/caticons/${row.caticonnm}`}
                      alt={row.catnm}
                    />
                  </div>

                  <div className="card-content">
                    <h3>{row.catnm}</h3>

                    <p>Explore available services</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="empty-state">No Category Found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default ViewCategoryUser;
