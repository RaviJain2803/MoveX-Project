import { useNavigate } from 'react-router-dom';
import './Success.css';

function Success() {

    const navigate = useNavigate();

    return (
        <div className="success-container">
            <div className="success-card">
                <div className="success-icon">✔</div>

                <h2 className="success-title">Payment Completed</h2>
                <p className="success-text">
                    Charity done successfully. Thank you for your kindness!
                </p>

                <button 
                    className="success-btn"
                    onClick={() => navigate('/user')}
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
}

export default Success;
