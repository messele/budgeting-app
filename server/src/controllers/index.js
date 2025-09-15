
import Budget from "./Budget.js";
import Schedule from "./Schedule.js";
import Transaction from "./Transaction.js";

const controllers = [
    new Budget(),
    new Transaction(),
    new Schedule()
];



export default [...controllers];