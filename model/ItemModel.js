import { itemDB } from "../db/DB.js";


export function saveItem(item) {
    itemDB.push(item);
}


export function getAllItems() {
    return itemDB;
}


export function updateItem(index, item) {
    itemDB[index] = item;
}


export function deleteItem(index) {
    itemDB.splice(index, 1);
}