import { useState, useEffect } from 'react';
import './ViewCharity.css';
import axios from 'axios';
import { __paymentdoneapiurl } from '../../../API_URL';

function ViewCharity() {
    const [charity, setCharity] = useState([]);

    useEffect(() => {
        axios.get(__paymentdoneapiurl + "fetch")
            .then((response) => {
                setCharity(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div id="templatemo_content_wrapper">
            <div className="tr_out">
                <h2>View Charity Details</h2>

                <table>
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Email</th>
                            <th>Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        {charity.length > 0 ? (
                            charity.map((row, index) => (
                                <tr key={row._id || index}>
                                    <td data-label="Transaction ID">{row._id}</td>
                                    <td data-label="Email">{row.UserId}</td>
                                    <td data-label="Amount">₹ {row.amount}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" style={{ textAlign: "center" }}>
                                    No charity records found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewCharity;
