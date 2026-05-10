import {
    saveCustomer,
    getAllCustomers,
    updateCustomer,
    deleteCustomer
} from "../model/CustomerModel.js";

$(document).ready(function () {

    function getNextCustomerId() {
        let customers = getAllCustomers();
        if (customers.length === 0) return "C001";
        let lastId = customers[customers.length - 1].id;
        let num = parseInt(lastId.replace("C", ""), 10) + 1;
        return "C" + num.toString().padStart(3, "0");
    }

    function setNextCustomerId() {
        $("#txtCusID").val(getNextCustomerId());
    }

    refresh();
    setNextCustomerId();

    // --- Save Button ---
    $("#btnSaveCus").click(function () {
        let customer = {
            id: $("#txtCusID").val(),
            name: $("#txtCusName").val(),
            address: $("#txtCusAddress").val(),
            salary: $("#txtCusSalary").val()
        };

        if (customer.name) {
            saveCustomer(customer);
            // Dropdown update
            $("#cmbCustomerID").append(`<option value="${customer.id}">${customer.id}</option>`);
            alert("Customer Saved! ✅");
            refresh();
            setNextCustomerId();
        }
    });

    // --- Update Button ---
    $("#btnUpdateCus").click(function () {
        let id = $("#txtCusID").val();
        let customers = getAllCustomers();
        let index = customers.findIndex(c => c.id === id);

        if (index !== -1) {
            let customer = {
                id: id,
                name: $("#txtCusName").val(),
                address: $("#txtCusAddress").val(),
                salary: $("#txtCusSalary").val()
            };
            
            updateCustomer(index, customer);
            alert("Customer Updated! ✅");
            refresh();
        }
    });

    // --- Delete Button ---
    $("#btnDeleteCus").click(function () {
        let id = $("#txtCusID").val();
        let customers = getAllCustomers();
        let index = customers.findIndex(c => c.id === id);

        if (index !== -1) {
            deleteCustomer(index);
            $(`#cmbCustomerID option[value='${id}']`).remove();
            alert("Customer Deleted! 🗑️");
            refresh();
        }
    });

    function loadAllCustomers() {
        $("#tblCustomerBody").empty();
        let customers = getAllCustomers();
        
        customers.forEach(c => {
            $("#tblCustomerBody").append(`<tr><td>${c.id}</td><td>${c.name}</td><td>${c.address}</td><td>${c.salary}</td></tr>`);
        });

        // Dashboard Count
        $("#lblCustCount").text(customers.length);
    }

    function refresh() {
        loadAllCustomers();
        $("#txtCusName, #txtCusAddress, #txtCusSalary").val("");
    }
});