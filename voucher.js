let couponApplied = false;

function applyCoupon() {
    if (couponApplied) {
        return; // Do nothing if the coupon has already been applied
    }

    const couponCode = document.getElementById('couponCode').value;
    const couponMessage = document.getElementById('couponMessage');

    // Example discounts based on coupon code
    const discounts = {
        'COUPON5': 5,
        'COUPON15': 15,
        'COUPON25': 25,
        'COUPON35': 35,
        'COUPON45': 45,
        'COUPON55': 55
    };

    const totalAmountElement = document.querySelector('#cartTotal');
    let totalAmount = parseFloat(totalAmountElement.innerText.replace('$', ''));

    if (discounts[couponCode] !== undefined) {
        // Apply the discount logic here. For example:
        const discountAmount = discounts[couponCode];
        const discountValue = (totalAmount * discountAmount) / 100;
        totalAmount = totalAmount - discountValue;
        totalAmountElement.innerText = `$${totalAmount.toFixed(2)}`;
        couponMessage.innerText = `Coupon applied! ${discountAmount}% off`;

        couponApplied = true; // Set the flag to true after applying the coupon
    } else {
        couponMessage.innerText = 'Invalid coupon code';
    }
}
