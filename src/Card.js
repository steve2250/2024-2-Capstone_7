import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

function Card({ title, description, linkText, linkUrl }) {
    return (
        <div className="card">
            <div className="card-image"></div>
            <div className="card-content">
                <h3>{title}</h3>
                <p>{description}</p>
                <Link to={linkUrl} className="card-link">
                    {linkText} ➔
                </Link>
            </div>
        </div>
    );
}

export default Card;
