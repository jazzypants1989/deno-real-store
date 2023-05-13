import render, { createSignal } from "../components/render.js"
import { addToast } from "./toast.js"

/**
 * The cart object. This is stored in localStorage.
 * An object full of CartItems as values, keyed by their product id.
 * @type {Cart}
 */
const storedCart = JSON.parse(localStorage.getItem("cart") || "{}")
export const [cart, setCart] = createSignal(storedCart)

/**
 * Initializes the cart. Checks localStorage, then adds the cart count and cart amount to the header.
 * @returns {void}
 */
export default function updateCart() {
  // createEffect(() => {
  //   const cartCount = document.querySelector("#cart-count")
  //   const cartTotal = document.querySelector("#cart-total")
  //   if (!cartCount || !cartTotal) return
  //   cartCount.innerHTML = cartTotalCount()
  //   cartTotal.innerHTML = cartTotalAmount()
  // })
  render({
    element: "#cart-count",
    component: cartTotalCount,
  })
  render({
    element: "#cart-total",
    component: cartTotalAmount,
  })
}

function cartTotalCount() {
  const items = Object.keys(cart()).reduce((total, id) => {
    return total + cart()[Number(id)].quantity
  }, 0)
  const returnedHTML = items === 0 ? "" : items.toString()
  return returnedHTML
}

/**
 * Calculates the total price of the cart.
 * @returns {string} - The total price of the cart.
 */
export function cartTotalAmount() {
  const amount = Object.keys(cart()).reduce((total, id) => {
    return (
      total + cart()[Number(id)].product.price * cart()[Number(id)].quantity
    )
  }, 0)
  const returnedHTML = amount === 0 ? "" : `$${amount.toFixed(2)}`
  return returnedHTML
}

/**
 * Adds a product to the cart. If the product is already there, it will increase the quantity by 1. If the product is not in the cart, it will be added with a quantity of 1.
 * @param {Product} product - The product to add to the cart.
 * @returns {void}
 */
export function addToCart(product) {
  if (cart()[product.id]) {
    setCart({
      ...cart(),
      [product.id]: {
        quantity: cart()[product.id].quantity + 1,
        product,
      },
    })
  } else {
    setCart({
      ...cart(),
      [product.id]: {
        quantity: 1,
        product,
      },
    })
  }
  localStorage.setItem("cart", JSON.stringify(cart()))
  addToast(`${product.title} added to cart!`, { type: "success" })
}

/**
 * Removes a product from the cart.
 * If the product is in the cart, it will decrease the quantity by 1.
 * If there is only 1 of the product in the cart, it will remove the product from the cart.
 * Either way, it will re-render the cart to reflect the changes.
 * @param {Product} product - The product to remove from the cart.
 * @returns {void}
 */
export function removeFromCart(product) {
  if (!cart()[product.id]) {
    return
  }
  setCart({
    ...cart(),
    [product.id]: {
      quantity: cart()[product.id].quantity - 1,
      product,
    },
  })
  if (cart()[product.id].quantity === 0) {
    const newCart = cart()
    delete newCart[product.id]
    setCart(newCart)
  }
  localStorage.setItem("cart", JSON.stringify(cart()))
  addToast(`${product.title} removed from cart!`, { type: "sad" })
}
