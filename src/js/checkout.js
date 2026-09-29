import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();

const order = new CheckoutProcess("customer-cart", ".checkout-summary");

order.init();

document.querySelector("#zip").addEventListener("blur", () => {
  order.calculateOrderTotal();
});

document
  .querySelector("form[name='checkout']")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    order.checkout();
  });
