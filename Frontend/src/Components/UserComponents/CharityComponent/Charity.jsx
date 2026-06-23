import './Charity.css';
import axios from 'axios';
import { useState } from 'react';
import { __paymentapiurl } from '../../../API_URL';

function Charity() {
    const [amount, setAmount] = useState(0)
    const email = localStorage.getItem("email");
    
    const MakeCharity = async () => {
        const response = await axios.post(__paymentapiurl, {"amount":amount, "email":email});
        window.open(response.data.url);
    };

    return (
        <div className="charity-container">
            <div className="charity-card">
                <h1 className="charity-title">Make a Charity Donation</h1>
                <p className="charity-text">
                    Your small contribution can bring a big change.
                </p>
                 <input onChange={e=>setAmount(e.target.value)} value={amount}/>
                 <br/><br/>
                <button className="charity-btn" onClick={MakeCharity}>
                   Click for Charity
                </button>
            </div>
        </div>
    );
}

export default Charity;
