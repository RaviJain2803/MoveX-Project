import "./ViewCategory.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { __categoryapiurl } from "../../../API_URL";

function ViewCategory() {

// All category data
const [categoryData, setCategoryData] = useState([]);

// Search value
const [search, setSearch] = useState("");

// EDIT STATE ADDED
const [editData, setEditData] = useState(null);

useEffect(() => {
fetchCategory();
}, []);

// Fetch Category List
const fetchCategory = () => {

axios
  .get(__categoryapiurl + "fetch")

  .then((response) => {

    setCategoryData(response.data.data || []);

  })

  .catch((error) => {

    console.log(error);

  });


};

// EDIT FUNCTION ADDED
const handleEdit = async () => {


try {

  await axios.patch(

    `${__categoryapiurl}update?_id=${editData._id}`,

    {
      catnm: editData.catnm,
      description: editData.description,
    }

  );

  alert("Category Updated");

  fetchCategory();

  setEditData(null);

}

catch (error) {

  console.log(error);

  alert("Update Failed");

}


};

// Active / Inactive Toggle
const handleStatusToggle = async (_id, currentStatus) => {


try {

  await axios.patch(
    `${__categoryapiurl}update?_id=${_id}`,
    {
      status: !currentStatus,
    }
  );

  fetchCategory();

}

catch (error) {

  console.log(error);

  alert("Unable to update status");

}


};

// Search Filter
const filteredData = categoryData.filter((row) =>
row.catnm
?.toLowerCase()
.includes(search.toLowerCase())
);

return (


<div className="view-category-container">

  <h1>Manage Categories</h1>


  {/* SEARCH */}

  <input
    type="text"
    placeholder="Search Category..."
    className="search-box"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />



  {/* EDIT FORM ADDED */}

  {

    editData && (

      <div
        style={{
          border: "1px solid black",
          padding: "20px",
          marginBottom: "20px"
        }}
      >

        <h3>Edit Category</h3>


        <input

          type="text"

          value={editData.catnm}

          placeholder="Category Name"

          onChange={(e) =>

            setEditData({

              ...editData,

              catnm: e.target.value

            })

          }

        />


        <br />
        <br />


        <input

          type="text"

          value={editData.description}

          placeholder="Description"

          onChange={(e) =>

            setEditData({

              ...editData,

              description: e.target.value

            })

          }

        />


        <br />
        <br />


        <button
          onClick={handleEdit}
        >
          Update
        </button>


        <button

          onClick={() =>

            setEditData(null)

          }

        >

          Cancel

        </button>

      </div>

    )

  }



  <table>

    <thead>

      <tr>

        <th>S.No</th>

        <th>Category Name</th>

        <th>Description</th>

        <th>Status</th>

        <th>Icon</th>

        <th>Action</th>

      </tr>

    </thead>


    <tbody>

      {

        filteredData.length > 0 ? (

          filteredData.map((row, index) => (

            <tr key={row._id}>


              <td>{index + 1}</td>

              <td>{row.catnm}</td>

              <td>{row.description}</td>


              <td>

                <button
                  className={
                    row.status
                      ? "status-btn active-btn"
                      : "status-btn inactive-btn"
                  }

                  onClick={() =>

                    handleStatusToggle(
                      row._id,
                      row.status
                    )

                  }

                >

                  {
                    row.status
                      ? "Active"
                      : "Inactive"
                  }

                </button>

              </td>



              <td>

                <img
                  src={`/uploads/caticons/${row.caticonnm}`}
                  alt={row.catnm}
                  className="category-icon"
                />

              </td>



              <td>

                {/* EDIT BUTTON UPDATED */}

                <button

                  className="edit-btn"

                  onClick={() =>

                    setEditData({
                      ...row
                    })

                  }

                >

                  Edit

                </button>

              </td>


            </tr>

          ))

        ) : (

          <tr>

            <td colSpan="6">

              No Category Found

            </td>

          </tr>

        )

      }

    </tbody>

  </table>

</div>


);

}

export default ViewCategory;
