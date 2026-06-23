import "./Services.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHouse,
  faBuilding,
  faTruck,
  faCar,
  faBox,
  faWarehouse
} from "@fortawesome/free-solid-svg-icons";

function Services() {

  return (

    <section id="services" className="services">

      {/* Header */}

      <header className="services-header">

        <h1>
          Our <span>Services</span>
        </h1>

        <p>
          We provide safe, secure and reliable moving
          solutions for homes and businesses.
        </p>

      </header>



      {/* Cards */}

      <section className="services-container">

        <article className="service-card">

          <div className="service-icon">

            <FontAwesomeIcon icon={faHouse}/>

          </div>

          <h2>House Shifting</h2>

          <p>
            Safe home relocation with professional packing
            and transportation support.
          </p>

        </article>



        <article className="service-card">

          <div className="service-icon">

            <FontAwesomeIcon icon={faBuilding}/>

          </div>

          <h2>Office Relocation</h2>

          <p>
            Office shifting services with smooth and
            hassle-free transportation.
          </p>

        </article>



        <article className="service-card">

          <div className="service-icon">

            <FontAwesomeIcon icon={faTruck}/>

          </div>

          <h2>Transport Service</h2>

          <p>
            Fast transport service with secure delivery
            across multiple locations.
          </p>

        </article>



        <article className="service-card">

          <div className="service-icon">

            <FontAwesomeIcon icon={faCar}/>

          </div>

          <h2>Car Transport</h2>

          <p>
            Safe vehicle transportation with complete
            tracking support.
          </p>

        </article>



        <article className="service-card">

          <div className="service-icon">

            <FontAwesomeIcon icon={faBox}/>

          </div>

          <h2>Packing Service</h2>

          <p>
            Professional packing and unpacking using
            high quality materials.
          </p>

        </article>



        <article className="service-card">

          <div className="service-icon">

            <FontAwesomeIcon icon={faWarehouse}/>

          </div>

          <h2>Storage Facility</h2>

          <p>
            Secure warehouse and temporary storage
            solutions for customers.
          </p>

        </article>

      </section>

    </section>

  )

}

export default Services;