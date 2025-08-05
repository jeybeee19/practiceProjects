let inputOrder = JSON.parse(localStorage.getItem("orders")) || [];

let html = "";
let total = 0;

inputOrder.forEach((item) => {
  let itemTotal = item.price * item.quantity;
  total += itemTotal;
  html += `<p>${item.quantity} x ${item.product} - ₱${itemTotal}</p>`;
});

html += `<hr><p><strong>Total: ₱${total}</strong></p>`;
document.querySelector(".orderList").innerHTML = html;

const userPay = document.querySelector(".inputPay");

function totalCost() {
  const userPay1 = Number(userPay.value);
  const change = userPay1 - total;

  if (userPay1 >= total) {
    document.querySelector(".receipt").innerHTML = `Change: ₱${change}`;

    // ✅ CLEAR orders in localStorage
    localStorage.removeItem("orders");

    // ✅ Optional: reset input
    userPay.value = "";
  } else {
    document.querySelector(".receipt").innerHTML = `Not enough payment!`;
  }
}

// 🔥 This is the fix:
window.totalCost = totalCost;
