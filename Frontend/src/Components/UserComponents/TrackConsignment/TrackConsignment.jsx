import "./TrackConsignment.css";
import React, { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import axios from "axios";

import { toast } from "react-toastify";

import { __consignmentapiurl } from "../../../API_URL";

const TrackConsignment = () => {
  const [searchParams] = useSearchParams();

  const urlTrackingId = searchParams.get("id");

  const [trackingId, setTrackingId] = useState("");

  const [loading, setLoading] = useState(false);

  const [order, setOrder] = useState(null);

  const steps = ["PENDING", "CONFIRMED", "PACKING", "IN_TRANSIT", "DELIVERED"];

  const searchOrder = async (id = trackingId) => {
    if (!id.trim()) {
      toast.error("Enter Tracking ID");

      setOrder(null);

      return;
    }

    try {
      setLoading(true);

      const res = await axios.get(__consignmentapiurl + "fetch", {
        params: {
          trackingId: id,
        },
      });

      const data = res.data.data?.[0];

      if (!data) {
        setOrder(null);

        toast.error("Tracking Not Found");

        return;
      }

      setOrder(data);
    } catch {
      setOrder(null);

      toast.error("Tracking Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (urlTrackingId) {
      setTrackingId(urlTrackingId);

      searchOrder(urlTrackingId);
    }
  }, [urlTrackingId]);

  const currentStep = steps.indexOf(order?.status);

  return (
    <div className="track-page">
      <div className="track-box">
        <h1>Track Consignment</h1>

        <p>Enter Tracking ID</p>

        <div className="search">
          <input
            type="text"
            placeholder="MOVXXXXXXXX"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchOrder();
              }
            }}
          />

          <button onClick={() => searchOrder()}>
            {loading ? "Searching..." : "Track"}
          </button>
        </div>
      </div>

      {order && (
        <div className="result">
          <div className="top">
            <div>
              <h2>{order.category}</h2>

              <p>{order.subcategory}</p>
            </div>

            <div className="badge">{order.status}</div>
          </div>

          <div className="details">
            <p>
              Tracking ID
              <span>{order.trackingId}</span>
            </p>

            <p>
              Pickup
              <span>{order.pickup_location}</span>
            </p>

            <p>
              Destination
              <span>{order.destination}</span>
            </p>
          </div>

          <div className="timeline">
            {steps.map((step, index) => (
              <div
                key={step}
                className={index <= currentStep ? "step active" : "step"}
              >
                <div className="circle">{index + 1}</div>

                <span>{step}</span>
              </div>
            ))}
          </div>

          <div className="description">{order.description}</div>
        </div>
      )}
    </div>
  );
};

export default TrackConsignment;
