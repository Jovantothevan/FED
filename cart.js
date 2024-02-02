document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
    updateTotals();
});

function addToCart(productId) {
    const product = document.getElementById(productId);
    const image = product.querySelector('img').src;
    const name = product.querySelector('.des h5').innerText;
    const priceStr = product.querySelector('.des h4').innerText;
    const price = parseFloat(priceStr.replace('$', '')); // Parse the price as a number

    // Check if the product already exists in the cart
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];

    let existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {
        // If the product already exists, increment the quantity
        existingProduct.quantity++;
    } else {
        // If it doesn't exist, add a new item to the cart
        const cartItem = { image, name, price, quantity: 1 };
        cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    showMessage(`${name} has been added to your cart.`);
    updateTotals();
}

function showMessage(message) {
    // Get the modal
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    var modalMessage = document.getElementById("modalMessage");

    // Update modal message
    modalMessage.innerText = message;

    // Show the modal
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Also close the modal when the user clicks anywhere outside of the modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function displayCartItems() {
    let cartItems = localStorage.getItem('cart');
    cartItems = cartItems ? JSON.parse(cartItems) : [];

    // Loop through items and append to table
    const tbody = document.querySelector('#cart tbody');
    tbody.innerHTML = ''; // Clear the table first

    cartItems.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><button onclick="removeItem(${index})"><i class="fas fa-times"></i></button></td>
            <td><img src="${item.image}" alt="Product Image"></td>
            <td>${item.name}</td>
            <td>${item.price ? `$${item.price.toFixed(2)}` : ''}</td> <!-- Format the price as a currency string or show empty string if undefined -->
            <td><input type="number" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)"></td>
            <td class="subtotal">${item.price ? `$${(item.price * item.quantity).toFixed(2)}` : ''}</td> <!-- Format the subtotal as a currency string or show empty string if undefined -->
        `;
        tbody.appendChild(row);
    });

    // Calculate totals
    updateTotals();
}

function updateTotals() {
    let cartItems = localStorage.getItem('cart');
    cartItems = cartItems ? JSON.parse(cartItems) : [];

    let subtotal = 0;
    cartItems.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    const shippingFee = subtotal > 0 ? 5.00 : 0; // Assuming free shipping for an empty cart
    const total = subtotal + shippingFee;

    // Update the DOM
    document.getElementById('cartSubtotal').innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById('cartTotal').innerText = `$${total.toFixed(2)}`;
}

function updateQuantity(index, quantity) {
    let cartItems = JSON.parse(localStorage.getItem('cart'));
    let parsedQuantity = parseInt(quantity, 10);
    if (isNaN(parsedQuantity) || parsedQuantity < 1) {
        console.error('Invalid quantity:', quantity);
        return; // Exit the function if the quantity is invalid
    }
    cartItems[index].quantity = parsedQuantity;
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCartItems(); // This will re-render the cart items and update totals
}
function removeItem(index) {
    let cartItems = JSON.parse(localStorage.getItem('cart'));
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    // Re-render the cart items
    displayCartItems();
    updateTotals();
}

function removeItem(index) {
    let cartItems = JSON.parse(localStorage.getItem('cart'));
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    // Re-render the cart items
    displayCartItems();
    updateTotals();
}

// Function to clear the cart
function clearCart() {
    localStorage.removeItem('cart');
}

function calculateTotalAmount() {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let totalAmount = 0;

    cartItems.forEach(item => {
        totalAmount += item.price * item.quantity;
    });

    return totalAmount;
}

function onCheckout() {
    let totalAmount = calculateTotalAmount();
    let username = localStorage.getItem("username");

    if (username) {
        updateLeaderboard(username, totalAmount);
        console.log("Checkout successful, total amount: $" + totalAmount.toFixed(2));
    } else {
        console.log("User is not logged in.");
    }
}

function updateLeaderboard(username, amount) {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    let userIndex = leaderboard.findIndex(user => user.username === username);
    let roundedAmount = Math.round(amount * 100) / 100;

    if (userIndex !== -1) {
        leaderboard[userIndex].points += roundedAmount;
    } else {
        leaderboard.push({ username, points: roundedAmount });
    }

    leaderboard.sort((a, b) => b.points - a.points);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}