import React, {useEffect, useState} from "react";
import {setLocalStorage} from "./helpers/localStorage";
import {getLocalStorage} from "./helpers/localStorage";
import {fetchTicketsData} from "./services/fetchTicketsData";
import {VscSettings} from "react-icons/vsc";
import {IoIosArrowDown} from "react-icons/io";
import Panel from "./components/Panel/Panel";
import {ordering, groups} from "./constants/constants";
import {GroupingList, OrderingList, priorityMap} from "./data/data";
import "./App.css";

function App() {
    const [showData, setShowData] = useState(() => {
        const state = getLocalStorage("state");
        return state ? state : [];
    });
    const [SOData, setSOData] = useState(() => {
        const storedState = getLocalStorage("SOData");
        return storedState ? storedState : ordering.PRIORITY;
    });
    const [SGData, setSGData] = useState(() => {
        const storedState = getLocalStorage("SGData");
        return storedState ? storedState : groups.STATUS;
    });
    const [tickets, setTickets] = useState();
    const [showFilterContainer, setShowFilterContainer] = useState(false);
    const [users, setUsers] = useState({});
    useEffect(() => {
        const getKanbanData = async () => {
            try {
                const results = await fetchTicketsData();
                setTickets(results.tickets);
                let data = {};
                results.users.forEach((user) => {
                    data[user.id] = user.name
                })
                setUsers(data);
            } catch (error) {
                console.error("Error fetching Tickets data:", error);
            }
        };
        getKanbanData();
    }, []);
    function nameById(id) {
        return users[id] ? users[id] : "User not found";
    }
    useEffect(() => {
        if (tickets === undefined) return;
        if (showData.length === 0) {
            const ticketsGroupedByStatus = groupByProperty(
                "status",
                tickets
            );
            setShowData(ticketsGroupedByStatus);
            setLocalStorage("state", ticketsGroupedByStatus);
        }
    }, [tickets]);    
    function groupByProperty(property, state) { 
        const ticketsSet = {};
        let n=state.length;
        for(let i=0;i<n;++i) {
            if (!ticketsSet[state[i][property]]) {
                ticketsSet[state[i][property]] = [];
                ticketsSet[state[i][property]].push(state[i]);
            } else {
                ticketsSet[state[i][property]].push(state[i]);
            }
            
        };    
        return ticketsSet;
    }
    const groupHandler = (grouping) => {
        setShowFilterContainer(false);
        setSGData(grouping);
        setLocalStorage("SGData", grouping);
        if (grouping === "status") {
            const ticketsGroupedByStatus = groupByProperty(
                "status",
                tickets
            );
            setShowData(ticketsGroupedByStatus);
            setLocalStorage("state", ticketsGroupedByStatus);
        } else if (grouping === "user") {
            const ticketsGroupedByName = groupByProperty(
                "userId",
                tickets
            );
            Object.keys(ticketsGroupedByName).forEach(function (key) {
                var newkey = nameById(key);
                ticketsGroupedByName[newkey] = ticketsGroupedByName[key];
                delete ticketsGroupedByName[key];
            });

            setShowData(ticketsGroupedByName);
            setLocalStorage("state", ticketsGroupedByName);
        } else if (grouping === "priority") {
            const ticketsGroupedByPriority = groupByProperty(
                "priority",
                tickets
            );
            Object.keys(ticketsGroupedByPriority).forEach(function (key) {
                var newkey = priorityMap[key];
                ticketsGroupedByPriority[newkey] =  ticketsGroupedByPriority[key];
                delete ticketsGroupedByPriority[key];
            });
            setShowData(ticketsGroupedByPriority);
            setLocalStorage("state", ticketsGroupedByPriority);
            console.log(SOData);
        }
        // orderHandler(SOData);
    };
    const orderHandler = (ordering) => {
        console.log(ordering)
        setShowFilterContainer(false);
        setSOData(ordering);
        setLocalStorage("SOData", ordering);
        if (ordering === "priority") {
            const sortTasksByPriority = (tasks) => {
                return tasks.slice().sort((a, b) => b.priority - a.priority);
            };

            const sortedData = {};

            for (const userName in showData) {
                const userTasks = showData[userName];
                const sortedTasks = sortTasksByPriority(userTasks);
                sortedData[userName] = sortedTasks;
            }

            setShowData(sortedData);
            setLocalStorage("state", sortedData);
        } else if (ordering === "title") {
            const sortTasksByTitleAscending = (tasks) => {
                return tasks.slice().sort((a, b) => a.title.localeCompare(b.title));
            };

            const sortedData = {};

            for (const userName in showData) {
                const userTasks = showData[userName];
                const sortedTasks = sortTasksByTitleAscending(userTasks);
                sortedData[userName] = sortedTasks;
            }
            setShowData(sortedData);
            setLocalStorage("state", sortedData);
        }
    };

    return (
        <article>
            <header>
                <div className="nav-container">
                    <div
                        className="display-button border-curve pointer"
                        onClick={() => {
                            setShowFilterContainer((prev) => !prev);
                        }}
                    >
                        <VscSettings style = {{transform: 'rotate(270deg)' }} />
                        <p style = {{fontWeight: '401'}}>Display</p>
                        <IoIosArrowDown/>
                    </div>
                    {showFilterContainer ? (
                        <div className="select-popup border-curve">
                            <div className="flex-container">
                                <p>Grouping</p>
                                <select
                                    className="select-element"
                                    name="group-select"
                                    onChange={(e) => groupHandler(e.target.value)}
                                    value={SGData}
                                >
                                    {GroupingList.map((item) => (
                                        <option value={item} label={item} key={item}
                                        />
                                    ))}
                                </select>
                            </div>

                            <div className="flex-container">
                                <p>Ordering</p>
                                <select
                                    className="select-element"
                                    name="order-select"
                                    onChange={(e) => orderHandler(e.target.value)}
                                    value={SOData}
                                >
                                    {OrderingList.map((item) => (
                                        <option value={item} label={item} key={item}
                                        />
                                    ))}
                                </select>
                            </div>
                        </div>
                    ) : null}
                </div>
            </header>
            <main className="content-container">
                <div className="Panel-box-container">
                    <div className="Panel-box-inner">
                        {Object.keys(showData).map((data) => {
                            return (
                                <Panel header={data} tickets={showData[data]} key={data} users={users}
                                />
                            );
                        })}
                    </div>
                </div>
            </main>
        </article>
    );
}

export default App;
