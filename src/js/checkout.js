import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();

const order = new CheckoutProcess("customer-cart", ".checkout-summary");

order.init();

document.querySelector("#zip").addEventListener("blur", () => {
  order.calculateOrderTotal();
});

document
  .querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault();
    const myForm = document.forms[0];
    const chk_status = myForm.checkValidity();
    myForm.reportValidity();
    if (chk_status)
      myCheckout.checkout();

    // order.checkout();
  });
