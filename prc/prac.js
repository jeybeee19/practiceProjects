// List of available menu items with their prices
const menuList = [
  { product: "Burger", price: 80 },
  { product: "Fries", price: 40 },
  { product: "Soda", price: 20 },
];

// Get the input elements from the HTML (product name and quantity)
const productOrder = document.querySelector(".productName");
const quantity = document.querySelector(".quantity");

// Get previous orders from localStorage, or use empty array if none
let inputOrder = [];
load();
// Object that controls showing, adding, and removing orders
export const showOrder = {
  // Function to add new order
  show() {
    let name = productOrder.value; // get product name from input
    let quan = Number(quantity.value); // get quantity from input

    // Find the product in the menuList (case-insensitive)
    const found = menuList.find(
      (item) => item.product.toLowerCase() === name.toLowerCase()
    );

    // If product is found, add it to inputOrder
    if (found) {
      inputOrder.push({
        product: found.product,
        price: found.price,
        quantity: quan,
        total: found.price * quan, // calculate total price for that item
      });

      // Save updated order list to localStorage
      save();
    }

    // Clear input fields after adding
    productOrder.value = "";
    quantity.value = 1;

    // Call display function to show updated order list
    this.display();
  },

  // Function to display current order list
  display() {
    let html = ""; // to store the HTML output
    let total = 0; // total price of all items

    // Loop through all orders to build the HTML and total
    inputOrder.forEach((item, i) => {
      let itemTotal = item.price * item.quantity;
      total += itemTotal;

      // Add each order as a paragraph with a delete button
      html += `<p>${item.quantity} x ${item.product} - ₱${itemTotal} <button onclick="showOrder.remove(${i})">delete</button></p>`;
    });

    // Show total at the end
    html += `<hr><p><strong>Total: ₱${total}</strong></p>`;

    // Display all orders in the page
    document.querySelector(".orderList").innerHTML = html;
  },

  // Function to remove an order by index
  remove(index) {
    inputOrder.splice(index, 1); // remove the item from array
    localStorage.setItem("orders", JSON.stringify(inputOrder)); // update storage
    this.display(); // refresh the order list
  },
};
function save() {
  localStorage.setItem("orders", JSON.stringify(inputOrder));
}
export function load() {
  inputOrder = JSON.parse(localStorage.getItem("orders")) || [];
}
// Make the showOrder object available to the browser (needed for delete button)
window.showOrder = showOrder;
console.log("hi");
