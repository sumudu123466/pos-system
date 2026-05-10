import { orderDB, itemDB } from "../db/DB.js";

let orderCart = [];


export function addToCart(item) {
    orderCart.push(item);
}


export function getOrderCart() {
    return orderCart;
}

export function clearCart() {
    orderCart = [];
}

export function calculateNetTotal() {
    return orderCart.reduce((total, item) => total + item.total, 0);
}


export function saveOrder(order) {
    orderDB.push(order);
}

export function getAllOrders() {
    return orderDB;
}