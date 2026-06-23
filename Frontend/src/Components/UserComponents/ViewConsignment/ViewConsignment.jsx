import "./ViewConsignment.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { __consignmentapiurl } from "../../../API_URL";

const ViewConsignment = () => {
  const navigate = useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const email =
    user?.email || "";

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [editData, setEditData] =
    useState(null);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const res =
        await axios.get(
          __consignmentapiurl +
            "fetch",

          {
            params: {
              email,
            },
          }
        );

      setOrders(
        res.data.data || []
      );
    } catch {
      setOrders([]);

      toast.error(
        "Unable to load consignments"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleUpdate =
    async () => {
      try {
        await axios.patch(
          __consignmentapiurl +
            "update",

          {
            condition: {
              _id:
                editData._id,
            },

            data: {
              pickup_location:
                editData.pickup_location,

              destination:
                editData.destination,

              description:
                editData.description,
            },
          }
        );

        toast.success(
          "Booking Updated"
        );

        setEditData(
          null
        );

        loadOrders();
      } catch {
        toast.error(
          "Update Failed"
        );
      }
    };

  const statusClass = (
    status
  ) => {
    switch (status) {
      case "PENDING":
        return "pending";

      case "CONFIRMED":
        return "confirmed";

      case "PACKING":
        return "packing";

      case "IN_TRANSIT":
        return "transit";

      case "DELIVERED":
        return "delivered";

      default:
        return "pending";
    }
  };

  return (
    <div className="consignment-page">

      <div className="top">
        <h1>
          My Consignments
        </h1>

        <p>
          Manage &
          Track your bookings
        </p>
      </div>

      {editData && (
        <div className="edit-modal">

          <div className="edit-card">

            <h2>
              Edit Booking
            </h2>

            <input
              value={
                editData.pickup_location
              }

              onChange={(
                e
              ) =>
                setEditData({
                  ...editData,

                  pickup_location:
                    e.target
                      .value,
                })
              }
            />

            <input
              value={
                editData.destination
              }

              onChange={(
                e
              ) =>
                setEditData({
                  ...editData,

                  destination:
                    e.target
                      .value,
                })
              }
            />

            <textarea
              rows="5"

              value={
                editData.description
              }

              onChange={(
                e
              ) =>
                setEditData({
                  ...editData,

                  description:
                    e.target
                      .value,
                })
              }
            />

            <div className="edit-actions">

              <button
                className="save"

                onClick={
                  handleUpdate
                }
              >
                Save
              </button>

              <button
                className="cancel"

                onClick={() =>
                  setEditData(
                    null
                  )
                }
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

      {loading ? (
        <div className="empty">
          Loading...
        </div>
      ) : orders.length ===
        0 ? (
        <div className="empty">
          No Consignment
          Found
        </div>
      ) : (
        <div className="grid">

          {orders.map(
            (item) => (
              <div
                key={
                  item._id
                }

                className="card"
              >

                <div
                  className={`status ${statusClass(
                    item.status
                  )}`}
                >
                  {
                    item.status
                  }
                </div>

                <h2>
                  {
                    item.category
                  }
                </h2>

                <div className="info">

                  <p>
                    Subcategory

                    <span>
                      {
                        item.subcategory
                      }
                    </span>
                  </p>

                  <p>
                    Pickup

                    <span>
                      {
                        item.pickup_location
                      }
                    </span>
                  </p>

                  <p>
                    Destination

                    <span>
                      {
                        item.destination
                      }
                    </span>
                  </p>

                  <p>
                    Tracking

                    <span>
                      {
                        item.trackingId
                      }
                    </span>
                  </p>

                </div>

                <div className="desc">
                  {
                    item.description
                  }
                </div>

                <div className="action-row">

                  <button
                    className="edit-btn"

                    onClick={() =>
                      setEditData(
                        item
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="track-btn"

                    onClick={() =>
                      navigate(
                        `/trackconsignment?id=${item.trackingId}`
                      )
                    }
                  >
                    Track
                  </button>

                </div>

              </div>
            )
          )}

        </div>
      )}

    </div>
  );
};

export default ViewConsignment;