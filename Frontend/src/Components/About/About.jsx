import "./About.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBullseye,
  faEye,
  faHandshake,
  faTruckFast,
  faShieldHalved,
  faHeadset
}
from "@fortawesome/free-solid-svg-icons";

function About() {

  return (

    <section
      id="about"
      className="about"
    >

      {/* Header */}

      <header className="about-header">

        <h1>

          About <span>MoveXpress</span>

        </h1>

        <p>

          We move more than goods —
          we move trust, comfort and peace of mind.

        </p>

      </header>



      {/* Company */}

      <article
      className="about-company"
      >

        <h2>

          Who We Are

        </h2>

        <p>

          MoveXpress is a trusted movers and packers
          platform designed to provide secure,
          fast and reliable relocation services.

          We specialize in house shifting,
          office relocation, transport and
          logistics support across India.

        </p>

      </article>




      {/* Cards */}

      <section className="about-cards">


        <article className="about-card">

          <div className="about-icon">

            <FontAwesomeIcon
            icon={faBullseye}
            />

          </div>

          <h3>

            Our Mission

          </h3>

          <p>

            Simplifying relocation with
            safe and stress-free service.

          </p>

        </article>





        <article className="about-card">

          <div className="about-icon">

            <FontAwesomeIcon
            icon={faEye}
            />

          </div>

          <h3>

            Our Vision

          </h3>

          <p>

            To become India's most
            trusted relocation brand.

          </p>

        </article>





        <article className="about-card">

          <div className="about-icon">

            <FontAwesomeIcon
            icon={faHandshake}
            />

          </div>

          <h3>

            Our Promise

          </h3>

          <p>

            Fast, secure and reliable
            customer satisfaction.

          </p>

        </article>

      </section>





      {/* Stats */}

      <section className="about-stats">

        <article>

          <h2>

            5000+

          </h2>

          <p>

            Deliveries

          </p>

        </article>


        <article>

          <h2>

            50+

          </h2>

          <p>

            Cities

          </p>

        </article>


        <article>

          <h2>

            98%

          </h2>

          <p>

            Happy Clients

          </p>

        </article>

      </section>





      {/* Why Choose */}

      <section className="why-us">

        <h2>

          Why Choose MoveXpress?

        </h2>


        <div className="why-container">

          <article>

            <FontAwesomeIcon
            icon={faTruckFast}
            />

            <p>

              Fast Delivery

            </p>

          </article>


          <article>

            <FontAwesomeIcon
            icon={faShieldHalved}
            />

            <p>

              Secure Service

            </p>

          </article>


          <article>

            <FontAwesomeIcon
            icon={faHeadset}
            />

            <p>

              24/7 Support

            </p>

          </article>

        </div>

      </section>


    </section>

  )

}

export default About;