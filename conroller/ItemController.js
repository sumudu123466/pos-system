import {
    saveItem,
    getAllItems,
    updateItem,
    deleteItem
} from "../model/ItemModel.js";

$(document).ready(function () {

    function getNextItemCode() {
        let items = getAllItems();
        if (items.length === 0) return "I001";
        let lastCode = items[items.length - 1].code;
        let num = parseInt(lastCode.replace("I", ""), 10) + 1;
        return "I" + num.toString().padStart(3, "0");
    }

    function setNextItemCode() {
        $("#txtItemCode").val(getNextItemCode());
    }

    refresh();
    setNextItemCode();

    // --- Save Item ---
    $("#btnSaveItem").click(function () {
        let item = {
            code: $("#txtItemCode").val(),
            name: $("#txtItemName").val(),
            qty: $("#txtItemQty").val(),
            price: $("#txtItemPrice").val()
        };

        if (item.name && item.qty && item.price) {
            saveItem(item);
            // Order dropdown update
            $("#cmbItemCode").append(`<option value="${item.code}">${item.code}</option>`);
            alert("Item Saved Successfully! ✅");
            refresh();
            setNextItemCode();
        } else {
            alert("Please fill in all fields!");
        }
    });

    // --- Update Item ---
    $("#btnUpdateItem").click(function () {
        let code = $("#txtItemCode").val();
        let items = getAllItems();
        let index = items.findIndex(i => i.code === code);

        if (index !== -1) {
            let item = {
                code: code,
                name: $("#txtItemName").val(),
                qty: $("#txtItemQty").val(),
                price: $("#txtItemPrice").val()
            };

            updateItem(index, item);
            alert("Item Updated! 🔄");
            refresh();
        } else {
            alert("Item not found! ❌");
        }
    });

    // --- Delete Item ---
    $("#btnDeleteItem").click(function () {
        let code = $("#txtItemCode").val();
        let items = getAllItems();
        let index = items.findIndex(i => i.code === code);

        if (index !== -1) {
            if (confirm("Are you sure you want to delete this item? 🗑️")) {
                deleteItem(index);
                $(`#cmbItemCode option[value='${code}']`).remove();
                alert("Item Deleted! 🗑️");
                refresh();
            }
        }
    });

    // --- Search Item ---
    $("#btnSearchItem").click(function () {
        let code = $("#txtSearchItem").val();
        let item = getAllItems().find(i => i.code === code);

        if (item) {
            $("#txtItemCode").val(item.code);
            $("#txtItemName").val(item.name);
            $("#txtItemQty").val(item.qty);
            $("#txtItemPrice").val(item.price);
        } else {
            alert("Item not found! ❌");
        }
    });

    // Table load & Dashboard Update
    function loadTable() {
        $("#tblItemBody").empty();
        let items = getAllItems();
        
        items.forEach(i => {
            $("#tblItemBody").append(`
                <tr>
                    <td>${i.code}</td>
                    <td>${i.name}</td>
                    <td>${i.qty}</td>
                    <td>${i.price}</td>
                </tr>
            `);
        });

        $("#lblItemCount").text(items.length);
    }

    function refresh() {
        loadTable();
        $("#txtItemName, #txtItemQty, #txtItemPrice, #txtSearchItem").val("");
    }

    $("#btnClearItem").click(refresh);
});

// Table Click Event
$(document).on('click', '#tblItemBody tr', function () {
    let row = $(this).children();
    $("#txtItemCode").val(row.eq(0).text());
    $("#txtItemName").val(row.eq(1).text());
    $("#txtItemQty").val(row.eq(2).text());
    $("#txtItemPrice").val(row.eq(3).text());
});