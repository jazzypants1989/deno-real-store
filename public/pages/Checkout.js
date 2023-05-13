import render from "render"
import { cart } from "cart"

/**
 * Creates the line items for the Stripe checkout session.
 * @returns {LineItem[]} - The line items for the Stripe checkout session.
 */
function createLineItems() {
  console.log("createLineItems", cart())
  return Object.keys(cart()).map((id) => {
    const idNum = Number(id)
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: cart()[idNum].product.title,
          images: [cart()[idNum].product.images[0]],
        },
        unit_amount: cart()[idNum].product.price * 100,
      },
      quantity: cart()[idNum].quantity,
    }
  })
}

/**
 * Loads Stripe.
 * @returns {Promise<import("stripe-js").Stripe | null>} - The Stripe object.
 */
async function stripeLoader() {
  const { loadStripe } = await import("stripe-js")
  const pk =
    "pk_test_51Ls3YjJiFO7cOn9i5GWxoJdBk5iN6FnUgdaHgD2wBxN7bqVFfcMKXQI4v86fwqhxe4b8CjYOKZNjg2VrcU2yply200OxYQlFCt"
  const stripe = await loadStripe(pk)
  return stripe
}

/**
 * Creates a Stripe checkout session.
 */
async function createSession() {
  const button = document.querySelector("#checkout")
  if (!button || !(button instanceof HTMLButtonElement)) {
    console.error("No checkout button found")
    return
  }
  button.disabled = true
  button.innerText = "Redirecting to Stripe... Hold your horses!"
  console.log("line items", createLineItems())
  const response = await fetch("/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      line_items: createLineItems(),
    }),
  })
  const data = await response.json()

  console.log(data)

  const stripe = await stripeLoader()

  if (!stripe) {
    console.error("Stripe failed to load")
    return
  }

  const result = await stripe.redirectToCheckout({
    sessionId: data.session.id,
  })

  console.log(result)

  // location.href = data.session.url
}

/**
 * Attaches the event listener to the checkout button.
 */
function attachListener() {
  const checkoutButton = document.querySelector("#checkout")
  if (checkoutButton) {
    checkoutButton.addEventListener("click", createSession)
  }
}

/**
 * Collects the products in the cart and renders them to HTML.
 */
const renderCartItems = () => {
  console.log("renderCartItems", cart())
  const cartItems = Object.keys(cart()).map((id) => {
    const idNum = Number(id)
    return `
      <div class="product">
      <a href="/product/${cart()[idNum].product.id}">
        <img src="${cart()[idNum].product.images[0]}" />
        <h2>${cart()[idNum].product.title}</h3>
      </a>
        <span>$${cart()[idNum].product.price}</span>
        <span>Quantity: ${cart()[idNum].quantity}</span>
      </div>
    `
  })
  return cartItems.join("")
}

/**
 * The checkout page view template.
 */
export default function Checkout() {
  document.title = "Checkout"
  if (Object.keys(cart()).length === 0) {
    render({
      component: `
        <h1>Checkout</h1>
        <p>We want to sell you things, but you don't have anything in your cart. You should probably fix that.</p>
      `,
    })
    return
  }

  render({
    component: `
    <div>
      <h1>Checkout</h1>
      ${renderCartItems()}
      
        <p>Total: $${Object.keys(cart()).reduce(
          (acc, id) =>
            acc +
            cart()[Number(id)].product.price * cart()[Number(id)].quantity,
          0
        )}</p>
      
        <button 
        style="margin-bottom: 1rem;"
        id="checkout">Checkout (Redirect to Stripe)</button>
    </div>
`,
    callback: attachListener,
  })
}
