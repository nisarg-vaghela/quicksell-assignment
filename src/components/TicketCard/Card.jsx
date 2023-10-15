import React from 'react';
import { BsThreeDots, BsCircleFill } from "react-icons/bs";
import { getLocalStorage } from "D:/Quicksell Assignment/quicksell-assignment-main/src/helpers/localStorage.js";
import "./Card.css";

const Card = ({ id, status, title, tag, name }) => {
    console.log("status is", status,id)
    return (
        <div className="card-container border-curve-card">
            <div className="card-header">
                <p className="card-id">{id}</p>
                {((getLocalStorage("SGData") !== "user"))? (
                    <div className="card-avatar-container">
                        <div className="card-image-container">
                            <img
                                src={`https://avatar.oxro.io/avatar.svg?name=${name}`}
                                className="image"
                                alt="temp"
                            />
                            <span
                                className={`${status? "card-avatar-badge-available": "card-avatar-badge"}`}
                            ></span>
                        </div>

                        
                    </div>
                ) : null}
            </div>
            <div className="card-hero">
                <div className="card-title">
                    <p>{title}</p>
                </div>

                <div className="card-tag-container">
                    <button className="alert-icon card-btn">
                        <BsThreeDots className="bg-color-icon" />
                    </button>
                    <div className="card-tag card-btn">
                        <BsCircleFill className="bg-color-icon" />
                        <p className="tag-text">{tag}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
