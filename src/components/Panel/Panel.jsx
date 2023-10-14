/* eslint-disable react/prop-types */
import React from 'react';
import Card from "../TicketCard/Card";
import {iconsMap} from "../../constants/constants"
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import "./Panel.css";

function Panel({ tickets, header, users }) {
    console.log(header)
    return (
        <div className="main-panel-container">
            <div className="panel-header">
                <div>
                    <div className="flex-gap">
                        {
                        
                         <div className="card-avatar-container">
                         <div className="card-image-container">
                            <img
                                src={iconsMap[header] || `https://ui-avatars.com/api/?name=${header}`}
                                className="image"
                                alt="temp"
                            />
                         </div>
                        </div> }

                        <p>{header}</p>
                        <span style = {{color: "#3f3d3d9c"}}>{tickets.length}</span>
                    </div>
                </div>

                <div className="flex-gap">
                    <button className="panel-top-btn"><AiOutlinePlus className="bg-color-icon" /></button>
                    <button className="panel-top-btn"><BiDotsHorizontalRounded className="bg-color-icon" /></button>
                </div>
            </div>

            <div className="panel-card">
                {tickets.map((ticket) => {
                    return (
                        <Card
                            key={ticket.id}
                            id={ticket.id}
                            userId={ticket.userId}
                            profileURL="https://www.investnational.com.au/wp-content/uploads/2016/08/person-stock-2.png"
                            status={ticket.status}
                            title={ticket.title}
                            tag={ticket.tag[0]}
                            users={users}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Panel;
