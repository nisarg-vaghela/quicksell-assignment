import React from 'react';
import { BsThreeDots, BsCircleFill } from "react-icons/bs";
import { getLocalStorage } from "D:/Quicksell Assignment/quicksell-assignment-main/src/helpers/localStorage.js";
import { MdFeaturedVideo } from "react-icons/md";
import "./Card.css";

const Card = ({ id, profileURL, status, title, tag, userId, users }) => {
    return (
        <div className="card-container border-curve-card">
            <div className="card-header">
                <p className="card-id">{id}</p>
                {(profileURL && (getLocalStorage("SGData") !== "user"))? (
                    <div className="card-avatar-container">
                        <div className="card-image-container">
                            <img
                                src={`https://ui-avatars.com/api/?name=${users[userId]}`}
                                className="image"
                                alt="temp"
                            />
                        </div>

                        <span
                            className={`card-avatar-badge ${status === true ? "available" : ""}`}
                        ></span>
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
