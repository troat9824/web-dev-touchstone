document.addEventListener("DOMContentLoaded", function () {
    const newsletterForms = document.querySelectorAll("footer form");

    newsletterForms.forEach(function (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Thank you for subscribing.");
        });
    });

    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const viewCartButton = document.getElementById("view-cart");
    const cartModal = document.getElementById("cart-modal");
    const cartItemsContainer = document.getElementById("cart-items");
    const closeCartButton = document.getElementById("close-cart");
    const clearCartButton = document.getElementById("clear-cart");
    const processOrderButton = document.getElementById("process-order");

    function getCart() {
        const savedCart = sessionStorage.getItem("bookHavenCart");
        return savedCart ? JSON.parse(savedCart) : [];
    }

    function saveCart(cart) {
        sessionStorage.setItem("bookHavenCart", JSON.stringify(cart));
    }

    function displayCart() {
        if (!cartItemsContainer) {
            return;
        }

        const cart = getCart();
        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
            return;
        }

        const list = document.createElement("ul");
        list.className = "cart-list";

        cart.forEach(function (item) {
            const listItem = document.createElement("li");

            const name = document.createElement("strong");
            name.textContent = item.name;

            const details = document.createElement("span");
            details.textContent = " - " + item.price + " - " + item.description;

            listItem.appendChild(name);
            listItem.appendChild(details);
            list.appendChild(listItem);
        });

        cartItemsContainer.appendChild(list);
    }

    addToCartButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const row = button.closest("tr");
            const cells = row.querySelectorAll("td");

            const item = {
                name: cells[0].querySelector("p").textContent.trim(),
                description: cells[1].textContent.trim(),
                price: cells[2].textContent.trim()
            };

            const cart = getCart();
            cart.push(item);
            saveCart(cart);

            alert("Item added to the cart.");
        });
    });

    if (viewCartButton && cartModal) {
        viewCartButton.addEventListener("click", function () {
            displayCart();
            cartModal.hidden = false;
        });
    }

    if (closeCartButton && cartModal) {
        closeCartButton.addEventListener("click", function () {
            cartModal.hidden = true;
        });
    }

    if (clearCartButton) {
        clearCartButton.addEventListener("click", function () {
            sessionStorage.removeItem("bookHavenCart");
            displayCart();
            alert("Cart cleared.");
        });
    }

    if (processOrderButton) {
        processOrderButton.addEventListener("click", function () {
            sessionStorage.removeItem("bookHavenCart");
            displayCart();
            alert("Thank you for your order.");

            if (cartModal) {
                cartModal.hidden = true;
            }
        });
    }

    const customerForm = document.getElementById("customer-form");

    if (customerForm) {
        customerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const selectedContactType = customerForm.querySelector(
                'input[name="contactType"]:checked'
            );

            const customerOrder = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                contactType: selectedContactType ? selectedContactType.value : "",
                productRequest: document.getElementById("product-request").value,
                message: document.getElementById("message").value,
                contactMethod: document.getElementById("contact-method").value,
                phone: document.getElementById("phone").value
            };

            localStorage.setItem(
                "bookHavenCustomerOrder",
                JSON.stringify(customerOrder)
            );

            alert("Thank you for your message.");
        });
    }
});