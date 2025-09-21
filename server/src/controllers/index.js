
import Budget from "./Budget.js";
import Category from "./Category.js";
import Schedule from "./Schedule.js";
import Transaction from "./Transaction.js";

const controllers = [
    new Category(),
    new Budget(),
    new Transaction(),
    new Schedule()
];



export default [...controllers];