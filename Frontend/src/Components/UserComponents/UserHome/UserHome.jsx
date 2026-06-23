import React, { useEffect, useState } from "react";
import "./UserHome.css";

const banners = [
  {
    image: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b",

    title: "Move Without Stress",

    subtitle: "Book trusted packers & movers instantly",
  },

  {
    image: "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2",

    title: "Door To Door Relocation",

    subtitle: "Fast, secure and affordable shifting",
  },

  {
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",

    title: "Track Your Move",

    subtitle: "Live updates during transportation",
  },
];

const services = [
  "House Shifting",

  "Office Relocation",

  "Vehicle Transport",

  "Warehouse Storage",
];

function UserHome() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="user-home">
      <section
        className="hero"
        style={{
          backgroundImage: `url(${banners[current].image})`,
        }}
      >
        <div className="hero-overlay">
          <h1>{banners[current].title}</h1>

          <p>{banners[current].subtitle}</p>

          <div className="hero-search">
            <input placeholder="Search Service" />

            <button>Book Now</button>
          </div>
        </div>
      </section>

      <section className="services">
        <h2>Popular Services</h2>

        <div className="service-grid">
          {services.map((item) => (
            <div key={item} className="service-card">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="process">
        <h2>How It Works</h2>

        <div className="process-grid">
          <div>
            1<h4>Choose Service</h4>
          </div>

          <div>
            2<h4>Book Slot</h4>
          </div>

          <div>
            3<h4>Track Move</h4>
          </div>

          <div>
            4<h4>Delivered</h4>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready To Move?</h2>

        <button>Get Started</button>
      </section>
    </div>
  );
}

export default UserHome;
