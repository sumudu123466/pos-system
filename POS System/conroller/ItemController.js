$(document).ready(function() {
    // 1. Save Item
    $("#btnSaveItem").click(function() {
        let code = $("#txtItemCode").val();
        let name = $("#txtItemName").val();
        let qty = $("#txtItemQty").val();
        let price = $("#txtItemPrice").val();

        if (code && name && qty && price) {
           
            itemDB.push({
                code: code,
                name: name,
                qty: qty,
                price: price
            });

            // Order dropdown update
            $("#cmbItemCode").append(`<option value="${code}">${code}</option>`);

            loadAllItems();
            clearItemFields();
            alert("Item Saved Successfully! ✅");
        } else {
            alert("Fill okkoma fields danna!");
        }
    });

    // 2. Update Item
    $("#btnUpdateItem").click(function() {
        let code = $("#txtItemCode").val();
        let index = itemDB.findIndex(i => i.code === code);

        if (index !== -1) {
            itemDB[index].name = $("#txtItemName").val();
            itemDB[index].qty = $("#txtItemQty").val();
            itemDB[index].price = $("#txtItemPrice").val();

            loadAllItems();
            clearItemFields();
            alert("Item Updated! 🔄");
        } else {
            alert("Mema Item eka system eke natha!");
        }
    });

    // 3. Delete Item
    $("#btnDeleteItem").click(function() {
        let code = $("#txtItemCode").val();
        let index = itemDB.findIndex(i => i.code === code);

        if (index !== -1) {
            if (confirm("Mema Item eka delete karanawaada?")) {
                itemDB.splice(index, 1);
                
                //dropdown delete
                $(`#cmbItemCode option[value='${code}']`).remove();

                loadAllItems();
                clearItemFields();
                alert("Item Deleted! 🗑️");
            }
        } else {
            alert("Delete karanna Item Code eka danna!");
        }
    });

    // 4. Clear Button
    $("#btnClearItem").click(function() {
        clearItemFields();
    });

    // Search function 
    $("#btnSearchItem").click(function() {
        let code = $("#txtSearchItem").val();
        let item = itemDB.find(i => i.code === code);

        if (item) {
            $("#txtItemCode").val(item.code);
            $("#txtItemName").val(item.name);
            $("#txtItemQty").val(item.qty);
            $("#txtItemPrice").val(item.price);
        } else {
            alert("Item not found! ❌");
        }
    });

    // Table load 
    function loadAllItems() {
        $("#tblItemBody").empty();
        itemDB.forEach(i => {
            $("#tblItemBody").append(
                `<tr>
                    <td>${i.code}</td>
                    <td>${i.name}</td>
                    <td>${i.qty}</td>
                    <td>${i.price}</td>
                </tr>`
            );
        });
        
        $("#lblItemCount").text(itemDB.length);
    }

    function clearItemFields() {
        $("#txtItemCode, #txtItemName, #txtItemQty, #txtItemPrice, #txtSearchItem").val("");
    }
});


$(document).on('click', '#tblItemBody tr', function () {
    $("#txtItemCode").val($(this).children('td:eq(0)').text());
    $("#txtItemName").val($(this).children('td:eq(1)').text());
    $("#txtItemQty").val($(this).children('td:eq(2)').text());
    $("#txtItemPrice").val($(this).children('td:eq(3)').text());
});