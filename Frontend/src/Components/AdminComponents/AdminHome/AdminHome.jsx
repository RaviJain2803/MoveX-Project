import React, { useEffect, useState } from "react";
import "./AdminHome.css";

const banners = [
  {
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600",
    title: "Manage Bookings Efficiently",
    subtitle: "Track all customer shifting requests from one place.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1600",
    title: "Professional Logistics Dashboard",
    subtitle: "Monitor vehicles, staff and delivery status.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=1600",
    title: "Fast & Secure Moving Services",
    subtitle: "Handle operations with complete transparency.",
  },
];

const AdminHome = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <main className="admin-home">
      {/* Banner Slider */}
      <div
        className="hero-banner"
        style={{
          backgroundImage: `url(${banners[current].image})`,
        }}
      >
        <div className="overlay">
          <button className="slider-arrow left-arrow" onClick={prevSlide}>
            ❮
          </button>

          <div className="banner-content">
            <h1>{banners[current].title}</h1>
            <p>{banners[current].subtitle}</p>
          </div>

          <button className="slider-arrow right-arrow" onClick={nextSlide}>
            ❯
          </button>

          <div className="dots">
            {banners.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrent(index)}
                className={
                  current === index ? "dot active-dot" : "dot"
                }
              ></span>
            ))}
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <section className="welcome-section">
        <h2>Welcome to Movers & Packers Admin Panel</h2>
        <p>
          Manage bookings, customers, vehicles, staff members and track all
          relocation activities from a single dashboard.
        </p>
      </section>

      {/* Stats Cards */}
      <section className="stats-grid">
        <div className="stat-card">
          <h3>125</h3>
          <span>Total Bookings</span>
        </div>

        <div className="stat-card">
          <h3>32</h3>
          <span>Pending Orders</span>
        </div>

        <div className="stat-card">
          <h3>18</h3>
          <span>Active Vehicles</span>
        </div>

        <div className="stat-card">
          <h3>96%</h3>
          <span>Customer Satisfaction</span>
        </div>
      </section>
    </main>
  );
};

export default AdminHome;