import "./Contact.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
 faLocationDot,
 faPhone,
 faEnvelope,
 faClock
}
from "@fortawesome/free-solid-svg-icons";


function Contact(){

return(

<section
id="contact"
className="contact"
>

    {/* Header */}

    <header className="contact-header">

        <h1>

            Contact <span>MoveXpress</span>

        </h1>

        <p>

            Need help with relocation?
            Contact our support team.

        </p>

    </header>



    <section className="contact-container">


        {/* Left Side */}


        <article className="contact-info">

            <h2>

                Get In Touch

            </h2>


            <div className="contact-item">

                <FontAwesomeIcon
                icon={faLocationDot}
                className="contact-icon"
                />

                <p>

                    Indore, India

                </p>

            </div>




            <div className="contact-item">

                <FontAwesomeIcon
                icon={faPhone}
                className="contact-icon"
                />

                <a href="tel:+919876543210">

                    +91 9876543210

                </a>

            </div>




            <div className="contact-item">

                <FontAwesomeIcon
                icon={faEnvelope}
                className="contact-icon"
                />

                <a href="mailto:support@movexpress.com">

                    support@movexpress.com

                </a>

            </div>




            <div className="contact-item">

                <FontAwesomeIcon
                icon={faClock}
                className="contact-icon"
                />

                <p>

                    Mon-Sat : 9AM - 8PM

                </p>

            </div>

        </article>





        {/* Right Side */}


        <article
        className="contact-form-area"
        >

            <form
            className="contact-form"
            >

                <input
                type="text"
                placeholder="Enter Name"
                required
                />


                <input
                type="email"
                placeholder="Enter Email"
                required
                />


                <input
                type="tel"
                placeholder="Phone Number"
                required
                />


                <textarea

                rows="5"

                placeholder="Message"

                required

                >

                </textarea>


                <button
                type="submit"
                >

                    Send Message

                </button>

            </form>

        </article>

    </section>

</section>

)

}

export default Contact;