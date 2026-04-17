$(document).ready(function() {
    let orderCart = [];

    // Customer Selection
    $("#cmbCustomerID").change(function() {
        let customer = customerDB.find(c => c.id == $(this).val());
        if (customer) {
            $("#txtOrderCusName").val(customer.name);
            $("#txtOrderCusAddress").val(customer.address);
        }
    });

    // Item Selection
    $("#cmbItemCode").change(function() {
        let item = itemDB.find(i => i.code == $(this).val());
        if (item) {
            $("#txtOrderItemName").val(item.name);
            $("#txtOrderQtyOnHand").val(item.qty);
            $("#txtOrderPrice").val(item.price);
        }
    });

    // Add to Cart
    $("#btnAddToCart").click(function() {
        let code = $("#cmbItemCode").val();
        let name = $("#txtOrderItemName").val();
        let price = parseFloat($("#txtOrderPrice").val()) || 0;
        let qty = parseInt($("#txtOrderQty").val()) || 0;

        if (qty <= 0) { alert("Invalid Qty!"); return; }

        let total = price * qty;
        orderCart.push({ code, name, price, qty, total });
        
        updateOrderTable();
    });

    function updateOrderTable() {
        $("#tblCartBody").empty();
        let netTotal = 0;
        orderCart.forEach(i => {
            $("#tblCartBody").append(`<tr><td>${i.code}</td><td>${i.name}</td><td>${i.price}</td><td>${i.qty}</td><td>${i.total}</td></tr>`);
            netTotal += i.total;
        });
        $("#lblSubTotal, #lblFinalTotal").text(netTotal.toFixed(2));
    }

    // Place Order
    $("#btnPlaceOrder").click(function() {
        if(orderCart.length > 0) {
            orderDB.push({ cart: orderCart, total: $("#lblFinalTotal").text() });
            $("#lblOrderCount").text(orderDB.length); // Dashboard update
            alert("Order Placed! ☕");
            orderCart = [];
            updateOrderTable();
        }
    });
});