document.addEventListener("DOMContentLoaded", function () {
    const newsletterForms = document.querySelectorAll("footer form");

    newsletterForms.forEach(function (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Thank you for subscribing.");
        });
    });

    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    addToCartButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            alert("Item added to the cart.");
        });
    });

    const clearCartButton = document.getElementById("clear-cart");

    if (clearCartButton) {
        clearCartButton.addEventListener("click", function () {
            alert("Cart cleared.");
        });
    }

    const processOrderButton = document.getElementById("process-order");

    if (processOrderButton) {
        processOrderButton.addEventListener("click", function () {
            alert("Thank you for your order.");
        });
    }

    const customerForm = document.getElementById("customer-form");

    if (customerForm) {
        customerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Thank you for your message.");
        });
    }
});