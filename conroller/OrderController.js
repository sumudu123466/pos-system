import { customerDB, itemDB } from "../db/DB.js";
import { 
    addToCart, 
    getOrderCart, 
    clearCart, 
    calculateNetTotal, 
    saveOrder, 
    getAllOrders 
} from "../model/OrderModel.js";

$(document).ready(function () {
    // Balance calculation on cash input
    $("#txtCash").on("input", function () {
        const cash = parseFloat($(this).val()) || 0;
        const total = parseFloat($("#lblFinalTotal").text()) || 0;
        const balance = cash - total;
        $("#txtBalance").val(balance >= 0 ? balance.toFixed(2) : "0.00");
    });

    

    // Load all dropdowns and set date when system loads
    loadAllData();

    function loadAllData() {
        // Set today's date
        $("#txtOrderDate").val(new Date().toISOString().split('T')[0]);

        // Fill Customer IDs
        $("#cmbCustomerID").empty().append('<option>Select Customer</option>');
        customerDB.forEach(c => {
            $("#cmbCustomerID").append(`<option value="${c.id}">${c.id}</option>`);
        });

        // Fill Item Codes
        $("#cmbItemCode").empty().append('<option>Select Item</option>');
        itemDB.forEach(i => {
            $("#cmbItemCode").append(`<option value="${i.code}">${i.code}</option>`);
        });

        // Show next Order ID (as an example)
        let nextID = getAllOrders().length + 1;
        $("#txtOrderID").val("OID-00" + nextID);
    }

    // 2. When a customer is selected, show name and address
    $("#cmbCustomerID").change(function () {
        let customer = customerDB.find(c => c.id == $(this).val());
        if (customer) {
            $("#txtOrderCusName").val(customer.name);
            $("#txtOrderCusAddress").val(customer.address);
        } else {
            $("#txtOrderCusName, #txtOrderCusAddress").val("");
        }
    });

    // 3. When an item is selected, show item details
    $("#cmbItemCode").change(function () {
        let item = itemDB.find(i => i.code == $(this).val());
        if (item) {
            $("#txtOrderItemName").val(item.name);
            $("#txtOrderQtyOnHand").val(item.qty);
            $("#txtOrderPrice").val(item.price);
        } else {
            $("#txtOrderItemName, #txtOrderQtyOnHand, #txtOrderPrice").val("");
        }
    });

    // 4. Add to Cart Button Logic
    $("#btnAddToCart").click(function () {
        let code = $("#cmbItemCode").val();
        let name = $("#txtOrderItemName").val();
        let price = parseFloat($("#txtOrderPrice").val()) || 0;
        let qty = parseInt($("#txtOrderQty").val()) || 0;
        let qtyOnHand = parseInt($("#txtOrderQtyOnHand").val()) || 0;

        if (qty <= 0) {
            alert("Please enter a valid quantity!");
            return;
        }

        if (qty > qtyOnHand) {
            alert("Requested quantity exceeds available stock!");
            return;
        }

        let total = price * qty;
        addToCart({ code, name, price, qty, total });
        refreshOrderUI();
    });

    // 5. Place Order Button Logic
    $("#btnPlaceOrder").click(function () {
        let cart = getOrderCart();
        if (cart.length > 0) {
            const total = calculateNetTotal();
            const cash = parseFloat($("#txtCash").val()) || 0;
            if (cash < total) {
                alert("Insufficient cash!");
                $("#txtCash").focus();
                return;
            }
            let order = {
                orderId: $("#txtOrderID").val(),
                date: $("#txtOrderDate").val(),
                customerId: $("#cmbCustomerID").val(),
                items: cart,
                total: total
            };

            saveOrder(order);
            // Update dashboard order count
            $("#lblOrderCount").text(getAllOrders().length);
            alert("Order placed successfully! ☕\nBalance: " + (cash - total).toFixed(2));
            clearCart();
            refreshOrderUI();
            loadAllData(); // Reset to next Order ID
            resetFields();
            $("#txtCash").val("");
            $("#txtBalance").val("");
        } else {
            alert("Please add items to the cart!");
        }
    });

    function refreshOrderUI() {
        $("#tblCartBody").empty();
        getOrderCart().forEach(i => {
            $("#tblCartBody").append(`
                <tr>
                    <td>${i.code}</td>
                    <td>${i.name}</td>
                    <td>${i.price}</td>
                    <td>${i.qty}</td>
                    <td>${i.total}</td>
                </tr>
            `);
        });
        $("#lblFinalTotal").text(calculateNetTotal().toFixed(2));
    }

    function resetFields() {
        $("#txtOrderQty, #txtOrderItemName, #txtOrderQtyOnHand, #txtOrderPrice").val("");
        $("#txtOrderCusName, #txtOrderCusAddress").val("");
    }
});