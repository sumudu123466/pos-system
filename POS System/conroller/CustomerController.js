$(document).ready(function() {
    $("#btnSaveCus").click(function() {
        let customer = {
            id: $("#txtCusID").val(),
            name: $("#txtCusName").val(),
            address: $("#txtCusAddress").val(),
            salary: $("#txtCusSalary").val()
        };

        customerDB.push(customer);
        
        // Order dropdown update 
        $("#cmbCustomerID").append(`<option value="${customer.id}">${customer.id}</option>`);
        
        loadAllCustomers();
        clearFields();
        alert("Customer Saved! ✅");
    });

    $("#btnUpdateCus").click(function() {
        let id = $("#txtCusID").val();
        let index = customerDB.findIndex(c => c.id === id);
        if (index !== -1) {
            customerDB[index].name = $("#txtCusName").val();
            customerDB[index].address = $("#txtCusAddress").val();
            customerDB[index].salary = $("#txtCusSalary").val();
            loadAllCustomers();
            alert("Customer Updated! ✅");
        }
    });

    $("#btnDeleteCus").click(function() {
        let id = $("#txtCusID").val();
        let index = customerDB.findIndex(c => c.id === id);
        if (index !== -1) {
            customerDB.splice(index, 1);
            $(`#cmbCustomerID option[value='${id}']`).remove(); // Dropdown delete
            loadAllCustomers();
            clearFields();
        }
    });

    function loadAllCustomers() {
        $("#tblCustomerBody").empty();
        customerDB.forEach(c => {
            $("#tblCustomerBody").append(`<tr><td>${c.id}</td><td>${c.name}</td><td>${c.address}</td><td>${c.salary}</td></tr>`);
        });
        // Dashboard Count Update
        $("#lblCustCount").text(customerDB.length);
    }

    function clearFields() {
        $("#txtCusID, #txtCusName, #txtCusAddress, #txtCusSalary").val("");
    }
});