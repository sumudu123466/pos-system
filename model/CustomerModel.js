
import { customerDB } from "../db/DB.js";


export function saveCustomer(customer) {
    customerDB.push(customer);
}

export function getAllCustomers() {
    return customerDB;
}


export function updateCustomer(index, customer) {
    customerDB[index] = customer;
}


export function deleteCustomer(index) {
    customerDB.splice(index, 1);
}