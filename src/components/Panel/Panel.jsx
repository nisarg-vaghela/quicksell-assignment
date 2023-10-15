/* eslint-disable react/prop-types */
import React from 'react';
import Card from "../TicketCard/Card";
import {iconsMap} from "../../constants/constants"
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import "./Panel.css";

function Panel({ SG, tickets, header, users }) {
    console.log(header)
    return (
        <div className="main-panel-container">
            <div className="panel-header">
                <div>
                    <div className="flex-gap">
                        {
                         <div className="card-image-container">
                            <img
                                src={SG === "user" ? (users[header]?`https://avatar.oxro.io/avatar.svg?name=${users[header].name}`:"") :iconsMap[header] || `https://avatar.oxro.io/avatar.svg?name=${header}`}
                                 className={SG==="user"?"p-image":""}
                                alt="temp"
                            />
                            {(SG === "user")?(
                                <span
                                className={`${users[header] && (users[header].available? "card-avatar-badge-available": "card-avatar-badge")}`}
                            ></span>
                            ): null}
                         </div>
                    }
                        { <p>{SG === "user" ? (users[header]? users[header].name:header): header}</p> }
                        {/* <p>{header}</p> */}
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
                            
                            status={users[ticket.userId] ? users[ticket.userId].available: false}
                            title={ticket.title}
                            tag={ticket.tag[0]}
                            name={users[ticket.userId] ? users[ticket.userId].name: ""}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Panel;
