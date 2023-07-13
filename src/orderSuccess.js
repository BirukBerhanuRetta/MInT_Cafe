// Create the elements
const orderConfirmationDiv = document.createElement('div');
orderConfirmationDiv.classList.add('order-confirmation');

const heading = document.createElement('h1');
heading.textContent = 'Order Submitted Successfully';

const totalPriceLabel = document.createElement('p');
totalPriceLabel.textContent = 'Total Price:';

const totalPrice = document.createElement('p');
totalPrice.classList.add('total-price');
totalPrice.textContent = '$99.99';

// Append the elements to the orderConfirmationDiv
orderConfirmationDiv.appendChild(heading);
orderConfirmationDiv.appendChild(totalPriceLabel);
orderConfirmationDiv.appendChild(totalPrice);

// Append the orderConfirmationDiv to the body
document.body.appendChild(orderConfirmationDiv);

