import { useNavigate } from 'react-router-dom';
import './Cancel.css';

function Cancel() {

    const navigate = useNavigate();

    return (
        <div className="cancel-container">
            <div className="cancel-card">
                <div className="cancel-icon">✖</div>

                <h2 className="cancel-title">Payment Failed</h2>
                <p className="cancel-text">
                    Something went wrong. Please try again.
                </p>

                <button 
                    className="cancel-btn"
                    onClick={() => navigate('/charity')}
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}

export default Cancel;
