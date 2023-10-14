import {API_URL} from "../constants/constants";

export const fetchTicketsData = async () => {
    try {
        const kanbanData = await fetch(API_URL);
        const results = await kanbanData.json();
        return results;
    } catch (error) {
        console.error("Error fetching Tickets data:", error);
        throw error;
    }
};