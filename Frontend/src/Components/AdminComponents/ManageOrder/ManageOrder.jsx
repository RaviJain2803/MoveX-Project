import "./ManageOrder.css";
import React, { useEffect, useState } from "react";

import axios from "axios";

import { toast } from "react-toastify";

import { __consignmentapiurl } from "../../../API_URL";

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);

  const limit = 6;

  const loadOrders = async () => {
    try {
      setLoading(true);

      const res = await axios.get(__consignmentapiurl + "fetch");

      setOrders(res.data.data || []);
    } catch {
      toast.error("Unable To Load Orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(
        __consignmentapiurl + "update",

        {
          condition: {
            _id: id,
          },

          data: {
            status: newStatus,
          },
        },
      );

      setOrders((prev) =>
        prev.map((i) =>
          i._id === id
            ? {
                ...i,
                status: newStatus,
              }
            : i,
        ),
      );

      toast.success("Status Updated");
    } catch {
      toast.error("Update Failed");
    }
  };

  const filtered = orders.filter((item) => {
    const s = search.toLowerCase();

    const matchSearch =
      item.email?.toLowerCase().includes(s) ||
      item.trackingId?.toLowerCase().includes(s) ||
      item.mobile?.includes(s) ||
      item.name?.toLowerCase().includes(s);

    const matchStatus = status ? item.status === status : true;

    return matchSearch && matchStatus;
  });

  const pages = Math.ceil(filtered.length / limit);

  const show = filtered.slice(
    (page - 1) * limit,

    page * limit,
  );

  return (
    <div className="manage">
      <div className="header">
        <h1>Manage Orders</h1>

        <p>Track & Update Customer Orders</p>
      </div>

      <div className="toolbar">
        <input
          placeholder="Search Name / Tracking / Mobile"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Status</option>

          <option value="PENDING">PENDING</option>

          <option value="CONFIRMED">CONFIRMED</option>

          <option value="PACKING">PACKING</option>

          <option value="IN_TRANSIT">IN_TRANSIT</option>

          <option value="DELIVERED">DELIVERED</option>
        </select>
      </div>

      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="grid">
          {show.map((item) => (
            <div key={item._id} className="card">
              <div className="top">
                <h3>{item.category}</h3>

                <div className={`badge ${item.status}`}>{item.status}</div>
              </div>

              <div className="customer">
                <h4>Customer</h4>

                <p>
                  Name
                  <span>{item.name}</span>
                </p>

                <p>
                  Mobile
                  <span>{item.mobile}</span>
                </p>

                <p>
                  Email
                  <span>{item.email}</span>
                </p>

                <p>
                  Address
                  <span>{item.address}</span>
                </p>
              </div>

              <hr />

              <div className="shipment">
                <p>
                  Tracking
                  <span>{item.trackingId}</span>
                </p>

                <p>
                  Pickup
                  <span>{item.pickup_location}</span>
                </p>

                <p>
                  Destination
                  <span>{item.destination}</span>
                </p>
              </div>

              <div className="desc">{item.description}</div>

              <select
                value={item.status}
                onChange={(e) => updateStatus(item._id, e.target.value)}
              >
                <option value="PENDING">PENDING</option>

                <option value="CONFIRMED">CONFIRMED</option>

                <option value="PACKING">PACKING</option>

                <option value="IN_TRANSIT">IN_TRANSIT</option>

                <option value="DELIVERED">DELIVERED</option>
              </select>
            </div>
          ))}
        </div>
      )}

      {pages > 1 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </button>

          <span>
            {page}/{pages}
          </span>

          <button disabled={page === pages} onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageOrder;
