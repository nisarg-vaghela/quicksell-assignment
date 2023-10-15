import backlog from "../data/images_icons/todo.png"
import todo from "../data/images_icons/3dots.png"
import in_progress from "../data/images_icons/in_progress.jpg"
import done from "../data/images_icons/done.png"
import canceled from "../data/images_icons/canceled.png"
import no_priority from "../data/images_icons/3dots.png"
import low from "../data/images_icons/low1.png"
import medium from "../data/images_icons/mediumO2.png"
import high from "../data/images_icons/high.png"
import urgent from "../data/images_icons/urgent.jpg"

export const API_URL = "https://api.quicksell.co/v1/internal/frontend-assignment";
export const priorityMap = {
    0: "No priority",
    1: "Low",
    2: "Medium",
    3: "High",
    4: "Urgent",
};
export const groups = {
    STATUS: "status",
    USER: "user",
    PRIORITY: "priority"
};
export const ordering = {
    TITLE: "title",
    PRIORITY: "priority"
};
export const allStatus = {
    "Backlog": "user",
    "Todo":"BiCircle",
    "In progress": "priority",
    "Done": "",
    "Canceled": ""  
};

export const iconsMap = {
    "Backlog": backlog,
    "Todo": todo,
    "In progress": in_progress,
    "Done": done,
    "Canceled": canceled,
    "No priority": no_priority,
    "Low":low,
    "Medium": medium,
    "High": high,
    "Urgent": urgent,
};

// export const groupByPriorityIcons = {
    
// };

// export const profilePhoto = {
    
// };
